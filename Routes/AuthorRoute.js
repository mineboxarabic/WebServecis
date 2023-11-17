import {AuthorSQLiteDAO} from '../repositories/AuthorSQLiteDAO.js'
import { Author } from '../Models/Author.js'



export async function getAuthor(req, res, conection) {
let id = req.params.id;

if (id == undefined) {
  res.status(400);
  res.send('Invalid id');
  return;
}

if (isNaN(id)) {
  res.status(400);
  res.send('Invalid id');
  return;
}

const db = await conection
  let authorDAO = new AuthorSQLiteDAO(db);
  let result = await authorDAO.read(id);
  res.status(200);
  res.send(result);
}

export async function getAuthors(req, res, conection) {
const db = await conection
let authorDAO = new AuthorSQLiteDAO(db);
let result = await authorDAO.readAll();
if (result == undefined) {
  res.status(400);
  res.send("Invalid id");
}
if (result.length == 0) {
  res.status(404);
  res.send("No authors");
}

res.status(200);
res.send(result);
}


export async function createAuthor(req, res, conection) {
let authorBody = req.body;

authorBody = JSON.parse(JSON.stringify(authorBody));

if (authorBody.name == undefined || authorBody.date == undefined || authorBody.rate == undefined) {
  res.status(400);
  res.send('Invalid author');
}
let author = new Author(authorBody.name, authorBody.date, authorBody.rate);
const db = await conection
let authorDAO = new AuthorSQLiteDAO(db);
let result = await authorDAO.create(author);
res.status(201);
res.send("You have created : \n" + result);
}


export async function deleteAuthor(req, res, conection) {
let id = req.params.id;
if (id == undefined) {
  res.send('Invalid id');
}

if (isNaN(id)) {
  res.send('Invalid id');
}

const db = await conection
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


export async function updateAuthor(req, res, conection) {
let id = req.params.id;
let authorBody = req.body;
authorBody = JSON.parse(JSON.stringify(authorBody));

if (id == undefined) {
  res.status(400);
  res.send('Invalid id');
}

if (isNaN(id)) {
  res.status(400);
  res.send('Invalid id');
}

if (authorBody.name == undefined || authorBody.date == undefined || authorBody.rate == undefined) {
  res.status(400);
  res.send('Invalid author');
}

let author = new Author(authorBody.name, authorBody.date, authorBody.rate);
const db = await conection
let authorDAO = new AuthorSQLiteDAO(db);
let result = await authorDAO.update(author, id);
res.status(200);
res.send("You have updated : \n" + result);

}

export async function getLastId(conection) {
const db = await conection
let authorDAO = new AuthorSQLiteDAO(db);
let result = await authorDAO.getLastId();

return parseInt(result['MAX(id)']);
}

export async function createRoutes(app, conection) {
  app.get('/authors/:id', (req, res) => {
    getAuthor(req, res, conection);
  });

  app.get('/authors', (req, res) => {
    getAuthors(req, res, conection);
  });

  app.post('/authors', (req, res) => {
    createAuthor(req, res, conection);
  });

  app.delete('/authors/:id', (req, res) => {
    deleteAuthor(req, res, conection);
  });

  app.put('/authors/:id', (req, res) => {
    updateAuthor(req, res, conection);
  });
}


