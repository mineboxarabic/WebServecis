import { TokenDAO } from "../dataAccess/TokenDAO.js";

export class TokenSQLiteDAO extends TokenDAO{
    constructor(db){
        super();

        this.db = db;
    }
    delete(id){
        const deleteToken = this.db.run(`DELETE FROM tokens WHERE id = ${id}`);
        return deleteToken;
    }
    create(token){ 
        const request = this.db.run(`INSERT INTO tokens (token, user_id) VALUES ('${token.token}', '${token.user_id}')`);
        return request;

    }
    read(id){
        const token = this.db.get(`SELECT * FROM tokens WHERE id = ${id}`);
        return token;
    }
    findAll(){ }
    deleteAll(){ }

    readByToken(token){
        const tokenDB = this.db.get(`SELECT * FROM tokens WHERE token = '${token}'`);
        return tokenDB;
    }

    deleteAllTokens(email){
        const deleteTokens = this.db.run(`DELETE FROM tokens WHERE user_id = (SELECT id FROM users WHERE email = '${email}')`);
        return deleteTokens;
    }
}