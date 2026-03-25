const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

const User = require('./models/User'); // Ensure User model is loaded for sync

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/leads', require('./routes/leads'));

const PORT = process.env.PORT || 5000;

// Sync Database and Start Server
sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}).catch(err => {
    console.error('Database Sync Error:', err);
});
