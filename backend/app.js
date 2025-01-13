const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const readerRoutes = require('./routes/readerRoutes');

const app = express();
app.use(express.json());

const PORT = config.PORT;
const mongoDBURL = config.mongoDBURL;

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/reader', readerRoutes);
