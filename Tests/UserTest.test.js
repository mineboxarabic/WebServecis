import * as userRoute from '../Routes/UsersRoute.js';
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import { UserSQLiteDAO } from '../repositories/UserSQLiteDAO.js'


let conection = open({
    filename: './database.db',
    driver: sqlite3.Database
  });

describe('Test for user creation',  () => { 

    test('User created', async() => {
        let lastId = await userRoute.getLastId(conection);
        let email = "test"+lastId+"@gmail.com"
    let req = {
        body: {
            name : "UserTestCreationxxxx",
            email : email,
            password : "123456"
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


describe('Test for user read all',  () => {
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
    await userRoute.readUsers(req, res, conection);
        expect(res.status).toBe(200);
    }
    );
})


describe('Test for user register',  () => {
    test('User register', async() => {
    let lastId = await userRoute.getLastId(conection);
    let email = "test"+lastId+"@gmail.com"
    let req = {

            body: {
                name: "UserTestRegister1",
                email: email+'23szzs',
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
                email: "mineboxarabic@gmail.com",
                password: "123",
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

  
test('Duplicate Email Registration', async() => {
const email = "duplicate@example.com";
// First registration attempt
let req1 = {
    body: {
    name: "DuplicateEmailUser1",
    email: email,
    password: "ValidPassword123!"
    }
};

// Second registration attempt with the same email
let req2 = {
    body: {
    name: "DuplicateEmailUser2",
    email: email,
    password: "ValidPassword123!"
    }
};

const res1 = {
    text: "",
    send: (input) => { res1.text = input; },
    status: (input) => { res1.status = input; }
};

const res2 = {
    text: "",
    send: (input) => { res2.text = input; },
    status: (input) => { res2.status = input; }
};

await userRoute.createUser(req1, res1, conection);
await userRoute.createUser(req2, res2, conection);
expect(res2.status).toBe(409); // Assuming 409 for conflict
});



test("User acces and authentication and authorization", async ()=>{

    //Login then take the token and use it to access the users
    let req = {

        body: {
            email: "mineboxarabic@gmail.com",
            password: "123",
        }

    }

    const res = {
    text: "",
    send: (input) => { res.text = input; },
    status: (input) => { res.status = input; }
    };
    await userRoute.login(req, res, conection);
    let token = res.text;
    console.log("the token is", token);
    let req2 = {
        headers: {
            authorization: token
        }
    }
    const res2 = {
    text: "",
    send: (input) => { res2.text = input; },
    status: (input) => { res2.status = input; }
    };
    await userRoute.readUsers(req2, res2, conection);
    console.log("the users", res2.text);
    expect(res2.status).toBe(200);
    
})  

