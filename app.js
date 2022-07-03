const express = require('express')
const cors = require('cors');

const passport = require('passport');

const app = express()

require('dotenv').config();
app.use(express.json()) 
const AppError = require('./utils/appError')


const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Token,Content-Type,Authorization,X-Forwarded-For',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  };
  app.use(cors(corsOptions));
  app.get('/cors', (req, res) => {
      res.set('Access-Control-Allow-Origin', true);
      res.header("Access-Control-Allow-Origin", "*")
      res.send({ "msg": "This has CORS enabled 🎈" })
      });
  app.enable('trust proxy');

app.use(passport.initialize());



app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

module.exports = app;