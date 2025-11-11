import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import pool from './config/db.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // 👈 your frontend port
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Health route
app.get('/', (req, res) => res.send('Shopify Orders Backend running'));

// API routes
app.use('/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// DB test
app.get('/db-test', async (req, res) => {
  try {
    const r = await pool.query('SELECT NOW()');
    res.json({ now: r.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
