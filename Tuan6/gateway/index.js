import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js';
import foodRoutes from './routes/food.route.js';
import orderRoutes from './routes/order.route.js';
import paymentRoutes from './routes/payment.route.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/foods', foodRoutes);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(` API Gateway running at http://localhost:${PORT}`);
});