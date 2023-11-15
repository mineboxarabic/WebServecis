    import express from 'express';
    import { AuthBookSQLiteDAO } from './DBLayer/AuthBookSQLiteDAO.js'
    import { Author } from './Classes/Book.js'

    const app = express().Router();

/*app.get('/authors/(:id)', (req, res) => {
    let id = req.params.id;
    
    if(id == undefined){
      res.send('Invalid id');
    }

    if(isNaN(id)){
      res.send('Invalid id');
    }

    conection.then(async (db) => {
      let authorDAO = new AuthorSQLiteDAO(db);
      let result = await authorDAO.read(id);
      res.send(result);
    })
  
    
    
})*/

export function getAuthor(req, res){
    let id = req.params.id;
    
    if(id == undefined){
      res.send('Invalid id');
    }

    if(isNaN(id)){
      res.send('Invalid id');
    }

    conection.then(async (db) => {
      let authorDAO = new AuthorSQLiteDAO(db);
      let result = await authorDAO.read(id);
      res.send(result);
    })
}

/*app.get('/authors', (req, res) => {
  conection.then(async (db) => {
    let authorDAO = new AuthorSQLiteDAO(db);
    let result = await authorDAO.readAll();
    res.send(result);
  })
}) */

export function getAuthors(req, res){
    conection.then(async (db) => {
      let authorDAO = new AuthorSQLiteDAO(db);
      let result = await authorDAO.readAll();
      res.send(result);
    })
}


app.post('/authors', (req, res) => {
  let authorBody = req.body;
  authorBody = JSON.parse(JSON.stringify(authorBody));
  console.log(authorBody);
  if(authorBody.name == undefined || authorBody.date == undefined || authorBody.rate == undefined){

    res.send('Invalid author');
  }
  let author = new Author(authorBody.name, authorBody.date, authorBody.rate);
  conection.then(async (db) => {
    let authorDAO = new AuthorSQLiteDAO(db);
    let result = await authorDAO.create(author);

    res.send("You have created : \n"+result);
  })
} )

app.delete('/authors/(:id)', (req, res) => {
  let id = req.params.id;
  if(id == undefined){
    res.send('Invalid id');
  }

  if(isNaN(id)){
    res.send('Invalid id');
  }

  conection.then(async (db) => {
    let authorDAO = new AuthorSQLiteDAO(db);
    let result = await authorDAO.delete(id);
    if(result == "Invalid id"){
      res.send("Invalid id");
    }else{
      res.send("YOU Have deleted this:" + result);

    }
  })
})

app.put('/authors/(:id)', (req, res) => {
  let id = req.params.id;
  let authorBody = req.body;
  authorBody = JSON.parse(JSON.stringify(authorBody));
  
  if(id == undefined){
    res.send('Invalid id');
  }

  if(isNaN(id)){
    res.send('Invalid id');
  }

  if(authorBody.name == undefined || authorBody.date == undefined || authorBody.rate == undefined){

    res.send('Invalid author');
  }

  let author = new Author(authorBody.name, authorBody.date, authorBody.rate);
  conection.then(async (db) => {
    let authorDAO = new AuthorSQLiteDAO(db);
    let result = await authorDAO.update(author, id);
    res.send("You have updated : \n"+result);
  })
} )

module.exports = app;