const express = require('express');
const amqp = require('amqplib');

const app = express();
app.use(express.json());

const PORT = 8084;
const RABBITMQ_URL = 'amqp://172.16.40.0';

function processPayment(payload) {
  setTimeout(() => {
    const isSuccess = Math.random() > 0.3; // tỉ lệ thanh toán thành công là 30%
    
    let eventType;
    let routingKey;
    
    if (isSuccess) {
      eventType = 'PAYMENT_COMPLETED';
      routingKey = 'payment.completed';
      console.log(`Payment SUCCESS for booking ${payload.bookingId}`);
    } else {
      eventType = 'BOOKING_FAILED';
      routingKey = 'booking.failed';
      console.log(`Payment FAILED for booking ${payload.bookingId}`);
    }
    
    const event = {
      type: eventType,
      payload: {
        bookingId: payload.bookingId,
        userId: payload.userId,
        amount: payload.amount
      }
    };
    
    if (channel) {
      channel.publish('movie_events', routingKey, Buffer.from(JSON.stringify(event)));
    }
  }, 2000);// giả lập độ trễ thanh toán, ví dụ là thanh toán thật
}

let channel;
// gửi email
async function connectRabbitMQ() {
  try {
    const conn = await amqp.connect(RABBITMQ_URL);
    channel = await conn.createChannel();
    await channel.assertExchange('movie_events', 'topic', { durable: false });
    
    const q = await channel.assertQueue('', { exclusive: true });
    
    // nghe việc tạo booking để thanh toán
    channel.bindQueue(q.queue, 'movie_events', 'booking.created');
    
    // nghe việc thanh toán để thông báo
    channel.bindQueue(q.queue, 'movie_events', 'payment.completed');
    channel.bindQueue(q.queue, 'movie_events', 'user.registered');
    channel.consume(q.queue, (msg) => {
      if (msg.content) {
        const event = JSON.parse(msg.content.toString());
        console.log(event)
        if (event.type === 'BOOKING_CREATED') {
          console.log(`Payment Service: Received BOOKING_CREATED for booking ${event.payload.bookingId}`);
          processPayment(event.payload);
        } else if (event.type === 'PAYMENT_COMPLETED') {
          // Act as Notification Service
          console.log(`\n======================================================`);
          console.log(`[NOTIFICATION] Booking #${event.payload.bookingId} thành công!`);
          console.log(`User ${event.payload.userId} đã đặt đơn #${event.payload.bookingId} thành công.`);
          console.log(`======================================================\n`);
        }
        else if (event.type === 'USER_REGISTERED') {
          console.log(`\n======================================================`);
          console.log(`[NOTIFICATION] Đăng ký thành công! 🎉`);
          console.log(`User ${event.payload.userId} đã đăng ký tài khoản thành công.`);
          console.log(`======================================================\n`);
        }
      }
    }, { noAck: true });

    console.log('Payment+Notification Service: Connected to RabbitMQ');
  } catch (error) {
    console.error('RabbitMQ connection error. Retrying in 5s...', error.message);
    setTimeout(connectRabbitMQ, 5000);
  }
}

connectRabbitMQ();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Payment+Notification Service running on port ${PORT}`);
});
