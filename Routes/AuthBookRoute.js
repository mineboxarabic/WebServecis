import { AuthBookSQLiteDAO } from '../repositories/AuthBookSQLiteDAO.js';
import { AuthBooks } from '../Models/AuthBooks.js';
import { Book } from "../Models/Book.js";
import * as utils from '../Utils/Utils.js'
import { BookDTO } from '../DTO/Book/BookDTO.js';
import { AuthBookDTO } from '../DTO/AuthBook/AuthBookDTO.js';


export async function createAuthBook(req, res, connection) {
  let bookBody = req.body;
  const authbook = new AuthBookDTO(bookBody.book, bookBody.author);
  const checkAttributes = utils.checkAttributes(authbook);

  if (!checkAttributes.ok) {
      res.status(checkAttributes.status);res.send(checkAttributes);
      return;
  }

  const db = await connection;
  let authbookDAO = new AuthBookSQLiteDAO(db);
  let result = await authbookDAO.create(authbook);

  res.status(201);
  res.send(result);
}

export async function readAuthBook(req, res, connection) {
  let id = req.params.id;
  const checkId = utils.checkId(id);
  if (!checkId.ok) {
      res.status(checkId.status);res.send(checkId);
      return;
  }

  const db = await connection;
  let bookDAO = new AuthBookSQLiteDAO(db);
  let result = await bookDAO.read(id);
  res.status(200);
  res.send(result);
}

export async function updateAuthBook(req, res, connection) {
  let id = req.params.id;
  let authBookBody = req.body;

  const authBook = new AuthBookDTO(authBookBody.book, authBookBody.author);
  
  const checkId = utils.checkId(id);
  if (!checkId.ok) {
      res.status(checkId.status);res.send(checkId);
      return;
  }

  const checkAttributes = utils.checkAttributes(authBook);
  if (!checkAttributes.ok) {
      res.status(checkAttributes.status);res.send(checkAttributes);
      return;
  }

  const db = await connection;
  let authBookDAO = new AuthBookSQLiteDAO(db);
  let result = await authBookDAO.update(authBook, id);
  res.status(200);
  res.send(result);
}


export async function deleteAuthBook(req, res, connection) {
  let id = req.params.id;
  const checkId = utils.checkId(id);
  if (!checkId.ok) {
      res.status(checkId.status);
      res.send(checkId);
      return;
  }

  const db = await connection;
  let authBookDAO = new AuthBookSQLiteDAO(db);
  let result = await authBookDAO.delete(id);

  if (result == undefined) {
      const error = { error: "Book not found to delete", status: 404 };
      res.status(404);
      res.send(error);
      return;
  }

  res.status(200);
  res.send(result);
}

//===================================================================================================

export async function readAllAuthBook(req, res, conection) {
  const db = await conection
  let authbookDAO = new AuthBookSQLiteDAO(db);
  let result = await authbookDAO.readAll();
  if(result.length == 0){
    const error = { error: "There are no authBooks", status: 404};
    res.status(404);
    res.send(error);
  }
    res.status(200);
    res.send(result);
}
export async function getLastIdAuthBook(conection) {
  const db = await conection
  let authbookDAO = new AuthBookSQLiteDAO(db);
  let result = await authbookDAO.getLastId();
  return result;
}
export async function createRoutes(app, conection) {
  app.post('/authbooks', (req, res) => {
    createAuthBook(req, res, conection);
  });

  app.get('/authbooks/:id', (req, res) => {
    readAuthBook(req, res, conection);
  });

  app.get('/authbooks', (req, res) => {
    readAllAuthBook(req, res, conection);
  });

  app.put('/authbooks/:id', (req, res) => {
    updateAuthBook(req, res, conection);
  });

  app.delete('/authbooks/:id', (req, res) => {
    deleteAuthBook(req, res, conection);
  });
}
