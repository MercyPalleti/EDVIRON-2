require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./src/config/db');


const authRoutes = require('./src/routes/auth');
const paymentRoutes = require('./src/routes/payment');
const webhookRoutes = require('./src/routes/webhook');
const transactionRoutes = require('./src/routes/transactions');


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// connect DB
connectDB();


// routes
app.use('/api/auth', authRoutes);
app.use('/api', paymentRoutes);
app.use('/api', webhookRoutes);
app.use('/api', transactionRoutes);


// error handler
app.use((err, req, res, next) => {
console.error(err);
res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));