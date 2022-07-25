import express, { response } from 'express';
import path from 'path';

import __dirname from './dirname.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';

//import Routes
import newAdmin from './routes/createAdmin.js';
import newProduct from './routes/newProduct.js';
import login from './routes/login.js';
import SearchRoute from './routes/search.js';

//connecting to DB
import connectdb from './connectdb.js';
connectdb(
  'mongodb+srv://admin:Administrator123@cluster0.hxm03.mongodb.net/?retryWrites=true&w=majority',
  'WellMed'
);

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/registerAdmin', newAdmin);
app.use('/product', newProduct);
app.use('/login', login);
app.use('/search', SearchRoute);

// app.use(function (req, res, next) {
//   res.status(404).json({message: "We couldn't find what you were looking for 😞"})
// })

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
});

export default app;
