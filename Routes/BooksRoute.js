import { BookSQLiteDAO } from '../repositories/BookSQLiteDAO.js'
import { Book } from '../Models/Book.js'
import * as utils from '../Utils/Utils.js'

import jwt from 'jsonwebtoken'




export async function createBook(req, res,conection){
    let bookBody = req.body;

    const checkAttributes = utils.checkAttributes(bookBody);
    if(checkAttributes.ok == false){
        res.status(checkAttributes.error.status);
        res.send(error);
        return;
    }


    //I dont need to check if the book exist beacuae i dont need to

 

    let book = new Book(bookBody.title, bookBody.date, bookBody.author, bookBody.rated);
    const db = await conection;
    let bookDAO = new BookSQLiteDAO(db);
    let result = await bookDAO.create(book);
    res.status(201);
    res.send(result);
}


export async function readBook(req, res,conection){
    let id = req.params.id;
 
    const checkId = utils.checkId(id);
    if(checkId.ok == false){
        res.status(checkId.error.status);
        res.send(checkId.error);
        return;
    }



    const db = await conection;
    let bookDAO = new BookSQLiteDAO(db);
    let result = await bookDAO.read(id);

    res.status(200);
    res.send(result);
    
}

export async function updateBook(req, res,conection){
    let id = req.params.id;
    let bookBody = req.body;
    bookBody = JSON.parse(JSON.stringify(bookBody));
    
    const checkId = utils.checkId(id);
    if(checkId.ok == false){
        res.status(checkId.error.status);
        res.send(checkId.error);
        return;
    }

    const checkAttributes = utils.checkAttributes(bookBody);
    if(checkAttributes.ok == false){
        res.status(checkAttributes.error.status);
        res.send(checkAttributes.error);
        return;
    }

    let book = new Book(bookBody.title, bookBody.date, bookBody.author, bookBody.rated);

    const db = await conection;
    let bookDAO = new BookSQLiteDAO(db);
    let result = await bookDAO.update(book, id);

    res.status(200);
    res.send(result);
}

export async function deleteBook(req, res,conection){

    let id = req.params.id;

    const checkId = utils.checkId(id);
    if(checkId.ok == false){
        res.status(checkId.error.status);
        res.send(checkId.error);
        return;
    }

    const db = await conection
    let bookDAO = new BookSQLiteDAO(db);
    let result = await bookDAO.delete(id);
    

    if(result == undefined){
        const error = { error: "Book not found to delete", status: 404};
        res.status(error.status);
        res.send(error);
        return;
    }

    res.status(200);
    res.send(result);
}


//=======================================================


export async function readBooks(req, res,conection){
    const db = await conection;
    let bookDAO = new BookSQLiteDAO(db);
    let result = await bookDAO.readAll();

    if(result.length == 0){
        const error = { error: "There are no books", status: 404};
        res.status(404);
        res.send(error);
    }

    res.status(200);
    res.send(result);
}
export async function getLastId(conection){
    const db = await conection
    let bookDAO = new BookSQLiteDAO(db);
    let lastId = await bookDAO.getLastID();
    return parseInt(lastId['MAX(id)']);
}
export async function createRoutes(app, conection){
    app.get('/books/(:id)', (req, res) => {
      readBook(req, res,conection);
    });
    
    app.get('/books',(req, res) => {
      readBooks(req, res,conection);
    });
    
    app.post('/books',(req, res) => {
      createBook(req, res,conection);
    });
    
    app.delete('/books/(:id)', authenticateToken,(req, res) => {
      deleteBook(req, res,conection);
    }
    )
    
    app.put('/books/(:id)', authenticateToken,(req, res) => {
      updateBook(req, res,conection);
    }
  )
}

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null){
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}