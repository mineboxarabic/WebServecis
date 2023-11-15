import { AuthBookSQLiteDAO } from '../DBLayer/AuthBookSQLiteDAO.js';
import { AuthBooks } from '../DBLayer/AuthBooks.js';
import express from 'express';

const app = express().Router();



app.get('/authbooks/(:id)', (req, res) => {
    let id = req.params.id;
    
    if(id == undefined){
      res.send('Invalid id');
    }

    if(isNaN(id)){
      res.send('Invalid id');
    }

    conection.then(async (db) => {
      let authbookDAO = new AuthBookSQLiteDAO(db);
      let result = await authbookDAO.read(id);
      res.send(result);
    }) 
  })

  app.get('/authbooks', (req, res) => {
    conection.then(async (db) => {
      let authbookDAO = new AuthBookSQLiteDAO(db);
      let result = await authbookDAO.readAll();
      res.send(result);
    })
  })

  app.post('/authbooks', (req, res) => {
    let authbookBody = req.body;
    authbookBody = JSON.parse(JSON.stringify(authbookBody));
    console.log(authbookBody);
    if(authbookBody.book == undefined || authbookBody.author == undefined){

      res.send('Invalid authbook');
    }
    let authbook = new AuthBooks(authbookBody.book, authbookBody.author);
    conection.then(async (db) => {
      let authbookDAO = new AuthBookSQLiteDAO(db);
      let result = await authbookDAO.create(authbook);

      res.send("You have created : \n"+result);
    })
  } )


  app.delete('/authbooks/(:id)', (req, res) => {
    let id = req.params.id;
    if(id == undefined){
      res.send('Invalid id');
    }

    if(isNaN(id)){
      res.send('Invalid id');
    }

    conection.then(async (db) => {
      let authbookDAO = new AuthBookSQLiteDAO(db);
      let result = await authbookDAO.delete(id);
      if(result == "Invalid id"){
        res.send("Invalid id");
      }else{
        res.send("YOU Have deleted this:" + result);

      }
    })
  }
  )


  app.put('/authbooks/(:id)', (req, res) => {
    let id = req.params.id;
    let authbookBody = req.body;
    authbookBody = JSON.parse(JSON.stringify(authbookBody));
    
    if(id == undefined){
      res.send('Invalid id');
    }

    if(isNaN(id)){
      res.send('Invalid id');
    }

    if(authbookBody.book == undefined || authbookBody.author == undefined){

      res.send('Invalid authbook');
    }

    let authbook = new AuthBooks(authbookBody.book, authbookBody.author);
    conection.then(async (db) => {
      let authbookDAO = new AuthBookSQLiteDAO(db);
      let result = await authbookDAO.update(authbook, id);
      res.send("You have updated : \n"+result);
    })
  } )

  
  module.exports = app;