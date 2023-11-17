
import { Author } from '../Models/Author.js';
import { AuthBookDAO } from '../dataAccess/AuthBookDAO.js'
import { Book } from '../Models/Book.js';
import { AuthBooks } from '../Models/AuthBooks.js';


export class AuthBookSQLiteDAO extends AuthBookDAO {
  constructor(db) {
    super();

    this.db = db;
  }
  async getLastId(){
    let lastId = await this.db.get(`SELECT * FROM authbooks ORDER BY id DESC LIMIT 1`);
    return lastId.id;
  }
    async update(authbook, id) {
        await this.db.run(`UPDATE authbooks SET book_id = '${authbook.book}', author_id = '${authbook.author}' WHERE id = ${id}`);
        let newAuthBook = await this.read(id);
        return newAuthBook;
    }

    async delete(id) {
        let authbook = await this.read(id);
        if(authbook == undefined){
            return undefined;
        }
            
        await this.db.exec(`DELETE FROM authbooks WHERE id = ${id}`);
        return authbook;
    }

    async create(authbook) {
        
    const reqest = await this.db.run(`INSERT INTO authbooks (book_id, author_id) VALUES ('${authbook.book}', '${authbook.author}')`);
    authbook.setID(reqest.lastID);
    return authbook;
    
    }

    async read(id) {
        const authbook = await this.db.get(`SELECT * FROM authbooks WHERE id = ${id}`);
        if(authbook == undefined){
            return undefined;
        }
        let authbookObject = new AuthBooks(authbook.book_id, authbook.author_id);
        authbookObject.setID(authbook.id);
        return authbookObject;
    }


    async isBookAuthor(book){
        let author = await this.db.get(`SELECT * FROM authbooks WHERE book_id = '${book}'`);
        if(author){
            return true;
        }
        return false;
    }

    async readAll() {
        return await this.db.all(`SELECT * FROM authbooks`);
    }

}