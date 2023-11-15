import express from 'express';
import { BookSQLiteDAO } from '../DBLayer/BookSQLiteDAO.js'
import { Book } from '../Classes/Book.js'

const app = express.Router();


/* app.get('/books/(:id)', (req, res) => {
    let id = req.params.id;
    
    if(id == undefined){
      res.send('Invalid id');
    }

    if(isNaN(id)){
      res.send('Invalid id');
    }

    conection.then(async (db) => {
      let bookDAO = new BookSQLiteDAO(db);
      let result = await bookDAO.read(id);
      res.send(result);
    })
  
    
    
})
 */
export function getBook(req, res,conection){
    let id = req.params.id;

    if(id == undefined){
        res.send('Invalid id');
    }

    if(isNaN(id)){
        res.send('Invalid id');
    }

    conection.then(async (db) => {
        let bookDAO = new BookSQLiteDAO(db);
        let result = await bookDAO.read(id);
        res.send(result);
    })
}




/* app.get('/books', (req, res) => {


  conection.then(async (db) => {
    let bookDAO = new BookSQLiteDAO(db);
    let result = await bookDAO.readAll();
    res.send(result);
  })


  
}) */

export function getBooks(req, res,conection){
    conection.then(async (db) => {
        let bookDAO = new BookSQLiteDAO(db);
        let result = await bookDAO.readAll();
        res.send(result);
    })
}


/* app.post('/books', (req, res) => {
  let bookBody = req.body;
  bookBody = JSON.parse(JSON.stringify(bookBody));
  console.log(bookBody);
  if(bookBody.title == undefined || bookBody.date == undefined || bookBody.author == undefined || bookBody.rated == undefined){

    res.send('Invalid book');
  }
  let book = new Book(bookBody.title, bookBody.date, bookBody.author, bookBody.rated);
  conection.then(async (db) => {
    let bookDAO = new BookSQLiteDAO(db);
    let result = await bookDAO.create(book);

    res.send("You have created : \n"+result);
  })
}) */

export async function createBook(req, res,conection){
    let bookBody = req.body;
    bookBody = JSON.parse(JSON.stringify(bookBody));

    if(bookBody.title == undefined || bookBody.date == undefined || bookBody.author == undefined || bookBody.rated == undefined){
        res.status(400);
        res.send('Invalid book');
    }
    let book = new Book(bookBody.title, bookBody.date, bookBody.author, bookBody.rated);

    const db = await conection
    let bookDAO = new BookSQLiteDAO(db);
    let result = await bookDAO.create(book);
    res.status(201);
    res.send("You have created : \n"+result.title);
  }



/* app.delete('/books/(:id)', (req, res) => {
  let id = req.params.id;
  if(id == undefined){
    res.send('Invalid id');
  }

  if(isNaN(id)){
    res.send('Invalid id');
  }

  conection.then(async (db) => {
    let bookDAO = new BookSQLiteDAO(db);
    let result = await bookDAO.delete(id);
    if(result == "Invalid id"){
      res.send("Invalid id");
    }else{
      res.send("YOU Have deleted this:" + result);

    }
  })
}) */

export async function deleteBook(req, res,conection){

    let id = req.params.id;
    if(id == undefined){
        res.status(204);
        res.send('Invalid id');
    }

    if(isNaN(id)){
        res.status(204);
        res.send('Invalid id');
    }

   const db = await conection
    let bookDAO = new BookSQLiteDAO(db);
    let result = await bookDAO.delete(id);
    

    if(result == "Invalid id"){
        res.status(204);
        res.send("Invalid id");
    }else{
        res.status(200);
        res.send("You have deleted : " + result.id);
    }
}


/* app.put('/books/(:id)', (req, res) => {
  let id = req.params.id;
  let bookBody = req.body;
  bookBody = JSON.parse(JSON.stringify(bookBody));
  
  if(id == undefined){
    res.send('Invalid id');
  }

  if(isNaN(id)){
    res.send('Invalid id');
  }

  if(bookBody.title == undefined || bookBody.date == undefined || bookBody.author == undefined || bookBody.rated == undefined){

    res.send('Invalid book');
  }

  let book = new Book(bookBody.title, bookBody.date, bookBody.author, bookBody.rated);
  conection.then(async (db) => {
    let bookDAO = new BookSQLiteDAO(db);
    let result = await bookDAO.update(book, id);
    res.send("You have updated : \n"+result);
  })
}
) */

export async function updateBook(req, res,conection){
    let id = req.params.id;
    let bookBody = req.body;
    bookBody = JSON.parse(JSON.stringify(bookBody));
    
    if(id == undefined){
        res.status(400);
        res.send('Invalid id');
    }

    if(isNaN(id)){
        res.status(400);
        res.send('Invalid id');
    }

    if(bookBody.title == undefined || bookBody.date == undefined || bookBody.author == undefined || bookBody.rated == undefined){
        res.status(400);

        res.send('Invalid book');
    }

    let book = new Book(bookBody.title, bookBody.date, bookBody.author, bookBody.rated);
   const db = await conection
    let bookDAO = new BookSQLiteDAO(db);
    let result = await bookDAO.update(book, id);

    res.status(200);
    res.send("You have updated : \n"+result.title+" "+lastId);
}

export async function getLastId(conection){
    const db = await conection
    let bookDAO = new BookSQLiteDAO(db);
    let lastId = await bookDAO.getLastID();
    console.log(lastId['MAX(id)']);
    return parseInt(lastId['MAX(id)']);
}

export default app;