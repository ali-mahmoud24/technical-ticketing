require('dotenv').config();

const HttpError = require('./models/http-error');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const adminRoutes = require('./routes/admin');
const engineerRoutes = require('./routes/engineer');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

app.use('/admin', adminRoutes);
app.use('/engineer', engineerRoutes);
app.use(authRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

const PORT = process.env.PORT || 8000;
const DB_URI = process.env.MONGODB_URI;

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('Db connected!');
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT} !`);
    });
  })
  .catch((err) => console.log(err));
