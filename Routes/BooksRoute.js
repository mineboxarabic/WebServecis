import { BookSQLiteDAO } from '../repositories/BookSQLiteDAO.js'
import { Book } from '../Models/Book.js'
import * as utils from '../Utils/Utils.js'

import jwt from 'jsonwebtoken'
import { BookDTO } from '../DTO/Book/BookDTO.js';
import UserDTO from '../DTO/User/UserDTO.js';




export async function createBook(req, res,conection){
    let bookBody = req.body;
    console.log('rated',bookBody['author_id']);

    const book = new BookDTO(bookBody.title, bookBody.date,bookBody['rated'],bookBody.author_id);
    console.log(book);

    const checkAttributes = utils.checkAttributes(book);



    if(checkAttributes.ok == false){
        res.status(checkAttributes.status);
        res.send(checkAttributes);
        return;
    }

 
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
        res.status(checkId.status);
        res.send(checkId);
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
    const book = new BookDTO(bookBody.title, bookBody.date, bookBody.author, bookBody.rated);

    
    const checkId = utils.checkId(id);
    if(checkId.ok == false){
        res.status(checkId.status);
        res.send(checkId);
        return;
    }

    const checkAttributes = utils.checkAttributes(book);
    if(checkAttributes.ok == false){
        res.status(checkAttributes.status);
        res.send(checkAttributes);
        return;
    }

   

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
        res.status(checkId.status);
        res.send(checkId);
        return;
    }

    const db = await conection
    let bookDAO = new BookSQLiteDAO(db);
    let result = await bookDAO.delete(id);
    

    if(result == undefined){
        const error = { error: "Book not found to delete", status: 404, ok:false};
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
        const error = { error: "There are no books", status: 404, ok:false};
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
    
    app.delete('/books/(:id)',(req, res) => {
      deleteBook(req, res,conection);
    }
    )
    
    app.put('/books/(:id)',(req, res) => {
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