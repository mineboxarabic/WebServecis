import express from 'express'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import * as bookRoutes from './Routes/BooksRoute.js';
import * as authorRoutes from './Routes/AuthorRoute.js';
import * as authBookRoutes from './Routes/AuthBookRoute.js';
import * as userRoutes from './Routes/UsersRoute.js';

import cors from 'cors';




const app = express()
const port = 3001

app.use(express.json());



app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'x-requested-with', 'Accept']
}));


let conection = open({
  filename: './database.db',
  driver: sqlite3.Database
});
bookRoutes.createRoutes(app,conection);
authorRoutes.createRoutes(app,conection);
authBookRoutes.createRoutes(app,conection);
userRoutes.createRoutes(app,conection);







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})