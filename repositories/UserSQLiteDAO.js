import { UserDAO } from "../dataAccess/UserDAO";
import { User } from "../Models/User";

export class UserSQLiteDAO extends UserDAO {
    constructor(db) {
        super();
    
        this.db = db;
    }
    
    async update(user, id) {
        await this.db.run(
        `UPDATE users SET name = '${user.name}', email = '${user.email}', password = '${user.password}', role = ${user.role} WHERE id = ${id}`
        );
        let newUser = await this.read(id);
        return newUser;
    }
    
    async delete(id) {
        let user = await this.read(id);
        if (user == undefined) {
        return undefined;
        }
    
        await this.db.exec(`DELETE FROM users WHERE id = ${id}`);
        return user;
    }
    
    async create(user) {
        const request = await this.db.run(
        `INSERT INTO users (name, email, password, role) VALUES ('${user.name}', '${user.email}', '${user.password}', '${user.role}')`
        );
        console.log("From the create",JSON.stringify(user));
        return user;
    }
    
    async read(id) {
        const user = await this.db.get(`SELECT * FROM users WHERE id = ${id}`);
        if (user == undefined) {
        return undefined;
        }
        let userObject = new User(user.name, user.email, user.password);
        userObject.setID(user.id);
        return userObject;
    }
    
    async readAll() {
        return await this.db.all(`SELECT * FROM users`);
    }
    
    async deleteAll() {
        await this.db.exec(`DELETE FROM users`);
    }
    async getLastId() {
        let lastId = await this.db.run(
        `SELECT * FROM users`
        );
        console.log("From the lastid",JSON.stringify(lastId));
        return lastId.lastID;

    }
    async getUser(user){
        let userDB = await this.db.get(`SELECT * FROM users WHERE email = '${user.email}' AND password = '${user.password}'`);
        if(userDB == undefined){
            return undefined;
        }
        let userObject = new User(userDB.name, userDB.email, userDB.password);
        userObject.setID(userDB.id);
        return userObject;
    }

    async readByEmail(email){
        const user = await this.db.get(`SELECT * FROM users WHERE email = '${email}'`);
        if(user == undefined){
            return undefined;
        }
        let userObject = new User(user.name, user.email, user.password);
        userObject.setID(user.id);
        return userObject;
    }
}

