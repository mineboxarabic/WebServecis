import express from 'express'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

import { BookSQLiteDAO } from './DBLayer/BookSQLiteDAO.js'

import bookRouter from './Routes/BooksRoute.js'
import * as bookRoutes from './Routes/BooksRoute.js';
const app = express()
const port = 3000

app.use(express.json());


let conection = open({
  filename: './database.db',
  driver: sqlite3.Database
});

app.get('/', (req, res) => {
  conection.then(async (db) => {
    let bookDAO = new BookSQLiteDAO(db);
    let result = await bookDAO.readAll();
    res.send(result);
  })
  
})

app.get('/books/(:id)', (req, res) => {
    bookRoutes.getBook(req, res,conection);

});

app.get('/books', (req, res) => {
    bookRoutes.getBooks(req, res,conection);
});

app.post('/books', (req, res) => {
    bookRoutes.createBook(req, res,conection);
});

app.delete('/books/(:id)', (req, res) => {
    bookRoutes.deleteBook(req, res,conection);
}
)

app.put('/books/(:id)', (req, res) => {
    bookRoutes.updateBook(req, res,conection);
}
)





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})