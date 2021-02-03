require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const setupRouting = require('./config/routing');
const PORT = process.env.PORT || 3001;

// Middleware

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://localhost:3001'],
    credentials: true,
  })
);
app.use(cookieParser());

// Make uploads folder static to be accessible by browser
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

connectDB();

setupRouting(app);

app.listen(PORT, console.log(`Server running on port ${PORT} running in ${process.env.NODE_ENV}`));
