import { AuthorSQLiteDAO } from "../repositories/AuthorSQLiteDAO.js";
import { Author } from "../Models/Author.js";
import * as utils from "../Utils/Utils.js";
import { AuthorDTO } from "../DTO/Author/AuthorDTO.js";

export async function createAuthor(req, res, connection) {
  let authorBody = req.body;
  const author = new AuthorDTO(authorBody.name, authorBody.date, authorBody.rate);
  const checkAttributes = utils.checkAttributes(authorBody);



  if (checkAttributes.ok == false) {
    const error = { error: "Invalid author attributes, they are undefied or empty OR BOTH", ok: false, status: 400 };  
      res.status(error.status);
      res.send(error);
      return;
  }

  const db = await connection;
  let authorDAO = new AuthorSQLiteDAO(db);
  let result = await authorDAO.create(author);
  res.status(201);
  
  res.send(result);
}

export async function readAuthor(req, res, connection) {
  let id = req.params.id;
  const checkId = utils.checkId(id);
  if (!checkId.ok) {
      res.status(checkId.status);
      res.send(checkId);
      return;
  }

  const db = await connection;
  let authorDAO = new AuthorSQLiteDAO(db);
  let result = await authorDAO.read(id);
  res.status(200);
  res.send(result);
}

export async function updateAuthor(req, res, connection) {
  let id = req.params.id;
  let authorBody = req.body;
  
  const author = new AuthorDTO(authorBody.name, authorBody.date, authorBody.rate);

  const checkId = utils.checkId(id);
  if (!checkId.ok) {
      res.status(checkId.status);res.send(checkId);
      return;
  }

  const checkAttributes = utils.checkAttributes(authorBody);
  if (!checkAttributes.ok) {
      res.status(checkAttributes.status);
      res.send(checkAttributes);
      return;
  }

  const db = await connection;
  let authorDAO = new AuthorSQLiteDAO(db);
  let result = await authorDAO.update(author, id);
  
  res.status(200);
  res.send(result);
}

export async function deleteAuthor(req, res, connection) {
  let id = req.params.id;
  const checkId = utils.checkId(id);
  if (!checkId.ok) {
      res.status(checkId.status);
      res.send(checkId);
      return;
  }

  const db = await connection;
  let authorDAO = new AuthorSQLiteDAO(db);
  let result = await authorDAO.delete(id);

  if (result == undefined) {
      const error = { error: "Author not found to delete", status: 404 };
      res.status(404);
      res.send(error);
      return;
  }

  res.status(200);
  res.send(result);
}

//===============================================================

export async function readAuthors(req, res, conection) {
  const db = await conection;
  let authorDAO = new AuthorSQLiteDAO(db);
  let result = await authorDAO.readAll();
  if (result.length == 0) {
    const error = { error: "There are no authors", status: 404 };
    res.status(404);
    res.send(error);
  }

  res.status(200);
  res.send(result);
}
export async function getLastId(conection) {
  const db = await conection;
  let authorDAO = new AuthorSQLiteDAO(db);
  let result = await authorDAO.getLastId();

  return parseInt(result["MAX(id)"]);
}
export async function createRoutes(app, conection) {
  app.get("/author/:id", (req, res) => {
    readAuthor(req, res, conection);
  });

  app.get("/authors", (req, res) => {
    readAuthors(req, res, conection);
  });

  app.post("/authors", (req, res) => {
    createAuthor(req, res, conection);
  });

  app.delete("/author/:id", (req, res) => {
    deleteAuthor(req, res, conection);
  });

  app.put("/author/:id", (req, res) => {
    updateAuthor(req, res, conection);
  });
}
