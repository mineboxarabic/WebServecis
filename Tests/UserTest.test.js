import * as userRoute from '../Routes/UsersRoute.js';
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import { UserSQLiteDAO } from '../repositories/UserSQLiteDAO.js'


let conection = open({
    filename: './database.db',
    driver: sqlite3.Database
  });

describe('Test for user creation',  () => { 
    let date = new Date();

    test('User created', async() => {
    let req = {
        body: {
            name : "UserTestCreationxxxx",
            email : "yassin@adem.justin",
            password : "123456",
            role: 1,
        }
    }

    const res = {
        text: "",
        send: (input) => { res.text = input; },
        status: (input) => { res.status = input; }
    };

    await userRoute.createUser(req, res, conection);
    console.log("From the user",res.text);
    expect(res.status).toBe(201);
    }
    );
}
)


describe('Test for user update',  () => {
    test('User updated', async() => {
    let date = new Date();
    let lastId = await userRoute.getLastId(conection);
    console.log ("The id" , lastId);
    let req = {
        params: {
            id : lastId
        },
        body: {
            name : "UserTestUpdatzzzze",
            email : "yassin2.yousdfsoej@diajfo",
            password : "123456",
            role: 1

        }
    }

    const res = {
        text: "",
        send: (input) => { res.text = input; },
        status: (input) => { res.status = input; }
    };
    await userRoute.updateUser(req, res, conection);
    console.log(res.text);
    expect(res.status).toBe(200);
    }
    );
})

describe('Test for user read',  () => {
    test('User read', async() => {
    let date = new Date();
    let lastId = await userRoute.getLastId(conection);
    let req = {
        params: {
            id : lastId
        }
    }

    const res = {
        text: "",
        send: (input) => { res.text = input; },
        status: (input) => { res.status = input; }
    };
    await userRoute.readUser(req, res, conection);
        expect(res.status).toBe(200);
    }
    );
})


 describe('Test for user delete',  () => {
    test('User deleted', async() => {
    let lastId = await userRoute.getLastId(conection);
    let req = {
        params: {
            id : lastId
        }
    }

    const res = {
        text: "",
        send: (input) => { res.text = input; },
        status: (input) => { res.status = input; }
    };
    await userRoute.deleteUser(req, res, conection);
        expect(res.status).toBe(200);
    }
    );
}) 


describe('Test for user get all',  () => {
    test('User get all', async() => {
    let req = {
        params: {
        }
    }

    const res = {
        text: "",
        send: (input) => { res.text = input; },
        status: (input) => { res.status = input; }
    };
    await userRoute.readAllUser(req, res, conection);
        expect(res.status).toBe(200);
    }
    );
})


describe('Test for user register',  () => {
    test('User register', async() => {
    let req = {

            body: {
                name: "UserTestRegister",
                email: "test@gmail.com",
                password: "123456",
            }

            
        
    }

    const res = {
        text: "",
        send: (input) => { res.text = input; },
        status: (input) => { res.status = input; }
    };
    await userRoute.register(req, res, conection);
        expect(res.status).toBe(201);
    }
    );
})

describe('Test for user Login',  () => {
    test('User Login', async() => {
    let req = {

            body: {
                email: "test@gmail.com",
                password: "123456",
            }
        
    }

    const res = {
        text: "",
        send: (input) => { res.text = input; },
        status: (input) => { res.status = input; }
    };
    await userRoute.login(req, res, conection);
        expect(res.status).toBe(200);
    }
    );
})


