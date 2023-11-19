import { AuthorSQLiteDAO } from "../repositories/AuthorSQLiteDAO.js";
import { Author } from "../Models/Author.js";


export async function createAuthor(req, res, conection) {
  let authorBody = req.body;

  authorBody = JSON.parse(JSON.stringify(authorBody));

  if (
    authorBody.name == undefined ||
    authorBody.date == undefined ||
    authorBody.rate == undefined
  ) {
    res.status(400);
    const error = { error: "Invalid user", status: 400 };
    res.send(error);
  }
  let author = new Author(authorBody.name, authorBody.date, authorBody.rate);
  const db = await conection;
  let authorDAO = new AuthorSQLiteDAO(db);
  let result = await authorDAO.create(author);
  res.status(201);
  res.send(result);
}

export async function readAuthor(req, res, conection) {
  let id = req.params.id;

  if (id == undefined) {
    const error = { error: "Invalid id", status: 400 };
    res.send(error);
  }

  if (isNaN(id)) {
    const error = { error: "Id is not a number", status: 400 };
    res.send(error);
  }

  const db = await conection;
  let authorDAO = new AuthorSQLiteDAO(db);
  let result = await authorDAO.read(id);
  res.status(200);
  res.send(result);
}

export async function updateAuthor(req, res, conection) {
  let id = req.params.id;
  let authorBody = req.body;
  authorBody = JSON.parse(JSON.stringify(authorBody));

  if (id == undefined) {
    res.status(400);
    res.send("Invalid id");
  }

  if (isNaN(id)) {
    res.status(400);
    res.send("Invalid id");
  }

  if (
    authorBody.name == undefined ||
    authorBody.date == undefined ||
    authorBody.rate == undefined
  ) {
    res.status(400);
    res.send("Invalid author");
  }

  let author = new Author(authorBody.name, authorBody.date, authorBody.rate);
  const db = await conection;
  let authorDAO = new AuthorSQLiteDAO(db);
  let result = await authorDAO.update(author, id);
  res.status(200);
  res.send("You have updated : \n" + result);
}

export async function deleteAuthor(req, res, conection) {
  let id = req.params.id;
  if (id == undefined) {
    res.send("Invalid id");
  }

  if (isNaN(id)) {
    res.send("Invalid id");
  }

  const db = await conection;
  let authorDAO = new AuthorSQLiteDAO(db);
  let result = await authorDAO.delete(id);

  if (result == "Invalid id") {
    res.status(400);
    res.send("Invalid id");
  } else {
    res.status(200);
    res.send("YOU Have deleted this:" + result);
  }
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
  app.get("/authors/:id", (req, res) => {
    readAuthor(req, res, conection);
  });

  app.get("/authors", (req, res) => {
    readAuthors(req, res, conection);
  });

  app.post("/authors", (req, res) => {
    createAuthor(req, res, conection);
  });

  app.delete("/authors/:id", (req, res) => {
    deleteAuthor(req, res, conection);
  });

  app.put("/authors/:id", (req, res) => {
    updateAuthor(req, res, conection);
  });
}
