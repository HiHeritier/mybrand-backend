const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require('dotenv');

const cors = require("cors");
const morgan = require("morgan");
const swaggerDoc = require("./swagger.json");
const swaggerUI = require("swagger-ui-express");


const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const queryRoutes = require('./routes/query');

dotenv.config();

const app = express();

const PATH = "./images/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, PATH));
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    req.body.imageUrl = fileName;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
});


// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use(upload.single('image'));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api', feedRoutes);
app.use('/auth', authRoutes);
app.use('/query', queryRoutes);

app.use(cors());
app.use(morgan("dev"));
app.use("/api/", feedRoutes, authRoutes, queryRoutes);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDoc, { explorer: true }));
app.use("*", (req, res, next) => {
	res.status(404).json({ error: "NOT FOUND", });
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data
  res.status(status).json({ message: message, data: data });
});
module.exports = app;

mongoose
  .connect( process.env.MONGODB_URI )
  .then(result => {
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => console.log(err));




  