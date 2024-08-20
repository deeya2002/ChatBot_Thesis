const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const { database_URI } = require('./config/keys');

const admin = require('./routes/api/admin');
const profile = require('./routes/api/profile');
const quiz = require('./routes/api/quiz');
const users = require('./routes/api/users');

const app = require("./app")
const port = process.env.PORT || 5000

mongoose.connect(database_URI, {
  useNewUrlParser: true,
})
  .then(() => console.log('Database Connected!'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/admin', admin);
app.use('/api/profile', profile);
app.use('/api/quiz', quiz);
app.use('/api/users', users);

app.get('/', (req, res) => {
  res.send({
    message: 'Hello World!'
  });
});

app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
)

module.exports = { app };