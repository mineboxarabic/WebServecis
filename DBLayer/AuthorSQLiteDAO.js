
import { Author } from '../Classes/Author.js';
import { AuthorDAO } from '../DAO Layer/AuthorDAO.js'

export class AuthorSQLiteDAO extends AuthorDAO {
    constructor(db) {
      super();
  
      this.db = db;
    }
  
    async update(author, id) {
        await this.db.run(`UPDATE authors SET name = '${author.name}', date = '${author.date}' WHERE id = ${id}`);
        let newAuthor = await this.read(id);
        return newAuthor;
    }

    async delete(id) {

        /*        let book = await this.read(id);
        if(book == undefined){
            return "Invalid id"
        }

         await this.db.exec(`DELETE FROM books WHERE id = ${id}`);
        return "You have deleted : \n"+book; */

        let author = await this.read(id);
        if(author == undefined){
            return "Invalid id"
        }
            
             await this.db.exec(`DELETE FROM authors WHERE id = ${id}`);
            return "You have deleted : \n"+author;
      
    }

    async create(author) {         
        const request = await this.db.run(`INSERT INTO authors (name, date, rate) VALUES ('${author.name}', '${author.date}', '${author.rate}')`);
        author.setID(request.lastID);
        return author;
    
    }

    async read(id) {

        const author = await this.db.get(`SELECT * FROM authors WHERE id = ${id}`);
        if(author == undefined){
            return undefined;
        }
        let authorObject = new Author(author.name, author.date, author.rate);
        authorObject.setID(author.id);
        return authorObject;
    }

    async readAll() {
        return await this.db.all(`SELECT * FROM authors`);
    }

    async deleteAll() {
        await this.db.exec(`DELETE FROM authors`);
    }

    async getLastId(){
        let id = await this.db.get(`SELECT MAX(id) FROM authors`);

        return id;
    }


    
      
  
  }