import { AuthBookSQLiteDAO } from '../DBLayer/AuthBookSQLiteDAO.js';
import { AuthBooks } from '../Classes/AuthBooks.js';


/* app.get('/authbooks/(:id)', (req, res) => {
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
  } ) */


  export async function createAuthBook(req, res, conection) {
    let authbookBody = req.body;
    authbookBody = JSON.parse(JSON.stringify(authbookBody));
 
    if (authbookBody.book == undefined || authbookBody.author == undefined) {
      res.send('Invalid authbook');
    }
    let authbook = new AuthBooks(authbookBody.book, authbookBody.author);
    const db = await conection
    let authbookDAO = new AuthBookSQLiteDAO(db);
    let result = await authbookDAO.create(authbook);

    if(result == undefined){
      res.status(400);
      res.send("Invalid authbook");
    }
  
    res.status(201);
    res.send("You have created : \n" + result);
  }

  export async function readAuthBook(req, res, conection) {
    let id = req.params.id;
    if (id == undefined) {
      res.send('Invalid id');
    }
  
    if (isNaN(id)) {
      res.send('Invalid id');
    }
  
    const db = await conection
    let authbookDAO = new AuthBookSQLiteDAO(db);
    let result = await authbookDAO.read(id);
    res.status(200);
    res.send(result);
  }

  export async function readAllAuthBook(req, res, conection) {
    const db = await conection
    let authbookDAO = new AuthBookSQLiteDAO(db);
    let result = await authbookDAO.readAll();
    res.status(200);
    res.send(result);
  }

  export async function updateAuthBook(req, res, conection) {
    let id = req.params.id;
    let authbookBody = req.body;
    authbookBody = JSON.parse(JSON.stringify(authbookBody));
  
    if (id == undefined) {
      res.status(400);
      res.send('Invalid id');
    }
  
    if (isNaN(id)) {
      res.status(400);
      res.send('Invalid id');
    }
  
    if (authbookBody.book == undefined || authbookBody.author == undefined) {
      res.status(400);
      res.send('Invalid authbook');
    }
  
    let authbook = new AuthBooks(authbookBody.book, authbookBody.author);
    const db = await conection
    let authbookDAO = new AuthBookSQLiteDAO(db);
    let result = await authbookDAO.update(authbook, id);
  
    res.status(200);
    res.send("You have updated : \n" + result.book);
  }

  export async function deleteAuthBook(req, res, conection) {
    let id = req.params.id;
    if (id == undefined) {
      res.send('Invalid id');
    }
  
    if (isNaN(id)) {
      res.send('Invalid id');
    }
  
    const db = await conection
    let authbookDAO = new AuthBookSQLiteDAO(db);
    let result = await authbookDAO.delete(id);
  
    if (result == "Invalid id") {
      res.status(400);
      res.send("Invalid id");
    } else {
      res.status(200);
      res.send("YOU Have deleted this:" + result);
    }
  }

  
  export async function getLastIdAuthBook(conection) {
    const db = await conection
    let authbookDAO = new AuthBookSQLiteDAO(db);
    let result = await authbookDAO.getLastId();
    return result;
  }

  
