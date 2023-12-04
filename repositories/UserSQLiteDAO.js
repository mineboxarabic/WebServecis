import { UserDAO } from "../dataAccess/UserDAO.js";
import UserDTO from "../DTO/User/UserDTO.js";
import { User } from "../Models/User.js";

export class UserSQLiteDAO extends UserDAO {
    constructor(db) {
        super();
    
        this.db = db;
    }
    
    async update(user, id) {


        //Update only the fields are are given
        let userDB = await this.read(id);
        if(userDB == undefined){
            return undefined;
        }
        if(user.name == undefined){
            user.name = userDB.name;
        }
        if(user.email == undefined){
            user.email = userDB.email;
        }
        if(user.password == undefined){
            user.password = userDB.password;
        }
        if(user.role == undefined){
            user.role = userDB.role;
        }
        await this.db.run(
            `UPDATE users SET name = '${user.name}', email = '${user.email}', password = '${user.password}', role = ${user.role} WHERE id = ${id}`
            );
            let newUser = await this.read(id);
            return newUser;


    }
    
    async delete(id) {
        
        let user = await this.read(id);
        console.log("the id:", id);
        console.log("user", JSON.stringify(user));

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
        return request;
    }
    
    async read(id) {
        const user = await this.db.get(`SELECT * FROM users WHERE id = ${id}`);
        if (user == undefined) {
        return undefined;
        }
        let userObject = new UserDTO(user.name, user.email, user.password, user.role);
        //userObject.setID(user.id);
        return userObject;
    }
    
    async readAll() {
        return await this.db.all(`SELECT * FROM users`);
    }
    
    async deleteAll() {
        await this.db.exec(`DELETE FROM users`);
    }
    async getLastId() {
        const lastId = await this.db.get(
        `SELECT * FROM users ORDER BY id DESC LIMIT 1`
        );
        console.log("From the lastid",JSON.stringify(lastId));
        return lastId.id;

    }
    async getUser(user){
        let userDB = await this.db.get(`SELECT * FROM users WHERE email = '${user.email}' AND password = '${user.password}'`);
        if(userDB == undefined){
            return undefined;
        }
        let userObject = new UserDTO(userDB.name, userDB.email, userDB.password);
       // userObject.setID(userDB.id);
        return userObject;
    }

    async readByEmail(email){
        const user = await this.db.get(`SELECT * FROM users WHERE email = '${email}'`);
        if(user == undefined){
            return undefined;
        }
        let userObject = new UserDTO(user.name, user.email, user.password, user.role);
        //userObject.setID(user.id);
        return userObject;
    }

    async findIdByEmail(email){
        const id =  await this.db.get(`SELECT id FROM users WHERE email = '${email}'`);
        if(id == undefined){
            return undefined;
        }

        return id;

    }
}

