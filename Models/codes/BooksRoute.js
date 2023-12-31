import { BookSQLiteDAO } from '../repositories/BookSQLiteDAO.js'
import { Book } from '../Models/Book.js'





export async function createBook(req, res,conection){
    let bookBody = req.body;
    bookBody = JSON.parse(JSON.stringify(bookBody));

    if(bookBody.title == undefined || bookBody.date == undefined || bookBody.author == undefined || bookBody.rated == undefined){
        res.status(400);
        const error = { error: "Invalid user", status: 400};
        res.send(error);
    }
    let book = new Book(bookBody.title, bookBody.date, bookBody.author, bookBody.rated);

    const db = await conection
    let bookDAO = new BookSQLiteDAO(db);
    let result = await bookDAO.create(book);
    res.status(201);
    res.send(result);
}
export async function readBook(req, res,conection){
    let id = req.params.id;
    if (id == undefined) {
        const error = { error: "Invalid id", status: 400};
        res.send(error);
    }

    if (isNaN(id)) {
        const error = { error: "Id is not a number", status: 400};
        res.send(error);
    }

    const db = await conection
    let bookDAO = new BookSQLiteDAO(db);
    let result = await bookDAO.read(id);
    res.status(200);
    res.send(result);
    
}
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
    res.send("You have updated : \n"+result.title);
}
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
    
    app.get('/books', (req, res) => {
      readBooks(req, res,conection);
    });
    
    app.post('/books', (req, res) => {
      createBook(req, res,conection);
    });
    
    app.delete('/books/(:id)', (req, res) => {
      deleteBook(req, res,conection);
    }
    )
    
    app.put('/books/(:id)', (req, res) => {
      updateBook(req, res,conection);
    }
  )
}