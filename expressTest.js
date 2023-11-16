import express from 'express'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

import { BookSQLiteDAO } from './DBLayer/BookSQLiteDAO.js'

import * as bookRoutes from './Routes/BooksRoute.js';
import * as authorRoutes from './Routes/AuthorRoute.js';
import * as authBookRoutes from './Routes/AuthBookRoute.js';


const app = express()
const port = 3001

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

let conection = open({
  filename: './database.db',
  driver: sqlite3.Database
});



bookRoutes.createRoutes(app,conection);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})