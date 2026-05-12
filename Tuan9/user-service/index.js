import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const sequelize = new Sequelize(
  process.env.DB_NAME || 'travel_booking',
  process.env.DB_USER || 'user',
  process.env.DB_PASS || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

const User = sequelize.define('User', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }
});

const initDb = async (retries = 5) => {
  while (retries) {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ alter: true });
      
      // Seed initial users if none exist
      const count = await User.count();
      if (count === 0) {
        await User.bulkCreate([
          { id: '1', name: 'Ho Quang Nhan', email: 'nhan@example.com', password: 'password123' },
          { id: '2', name: 'Tran Long Vu', email: 'vu@example.com', password: 'password123' }
        ]);
        console.log('Seeded initial users');
      }
      console.log('User database synced');
      break;
    } catch (error) {
      console.error(`Unable to connect to the database (Retries left: ${retries - 1}):`, error.message);
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000)); // Wait 5s before retry
    }
  }
};

initDb();

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });
    if (user) {
      const userData = user.toJSON();
      delete userData.password;
      res.json(userData);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      const userData = user.toJSON();
      delete userData.password;
      res.json(userData);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
