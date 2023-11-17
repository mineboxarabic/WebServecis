import { UserSQLiteDAO } from "../repositories/UserSQLiteDAO";
import { User } from "../Models/User.js";
import bcrypt from "bcrypt";


export async function createUser(req, res, conection) {
    let userBody = req.body;
    userBody = JSON.parse(JSON.stringify(userBody));

    if (
        userBody.name == undefined ||
        userBody.email == undefined ||
        userBody.password == undefined
    ) {
        res.status(400);
        res.send("Invalid user");
    }
    let user = new User(userBody.name, userBody.email, userBody.password);
    const db = await conection;
    let userDAO = new UserSQLiteDAO(db);
    let result = await userDAO.create(user);

    res.status(201);
    res.send("You have created : \n" + result);
}

export async function readUser(req, res, conection) {
    let id = req.params.id;
    if (id == undefined) {
        res.send("Invalid id");
    }

    if (isNaN(id)) {
        res.send("Invalid id");
    }

    const db = await conection;
    let userDAO = new UserSQLiteDAO(db);
    let result = await userDAO.read(id);
    res.status(200);
    res.send(result);
}


export async function readAllUser(req, res, conection) {
    const db = await conection;
    let userDAO = new UserSQLiteDAO(db);
    let result = await userDAO.readAll();
    res.status(200);
    res.send(result);
}

export async function updateUser(req, res, conection) {
    let id = req.params.id;
    let userBody = req.body;
    userBody = JSON.parse(JSON.stringify(userBody));

    if (id == undefined) {
        res.status(400);
        res.send("Invalid id");
        return;
    }

    if (
        userBody.name == undefined ||
        userBody.email == undefined ||
        userBody.password == undefined ||
        userBody.role == undefined
    ) {
        res.status(400);
        res.send("Invalid user");
        return;
    }

    const db = await conection;
    let userDAO = new UserSQLiteDAO(db);
    let result = await userDAO.update(userBody, id);
    res.status(200);
    res.send("You have updated : \n" + result);
}

export async function deleteUser(req, res, conection) {
    let id = req.params.id;
    if (id == undefined) {
        res.send("Invalid id");
    }

    if (isNaN(id)) {
        res.send("Invalid id");
    }

    const db = await conection;
    let userDAO = new UserSQLiteDAO(db);
    let result = await userDAO.delete(id);

    if (result == "Invalid id") {
        res.status(400);
        res.send("Invalid id");
    } else {
        res.status(200);
        res.send("YOU Have deleted this:" + result);
    }
}

export async function deleteAllUser(req, res, conection) {
    const db = await conection;
    let userDAO = new UserSQLiteDAO(db);
    let result = await userDAO.deleteAll();
    res.status(200);
    res.send("You have deleted all users");
}


export async function getLastId(conection) {
    const db = await conection;
    let userDAO = new UserSQLiteDAO(db);
    let result = await userDAO.getLastId();
    return result;
}

export async function login(req, res, conection) {
    let userBody = req.body;
    userBody = JSON.parse(JSON.stringify(userBody));
    if (
        userBody.email == undefined ||
        userBody.password == undefined
    ) {
        res.status(400);
        res.send("Invalid user");
    }



    const db = await conection;
    let userDAO = new UserSQLiteDAO(db);


    let user = await userDAO.readByEmail(userBody.email);
    if (user == undefined) {
        res.status(400);
        res.send("Invalid user");
    }
    let password = user.password;
    let resultComp = await bcrypt.compare(userBody.password, password);
    if (resultComp == false) {
        userBody.password = password;
        res.status(400);
        res.send("Invalid user");
    }




    console.log("From the login", userBody.password);
    res.status(200);
    res.send("You have created : \n" + user);
};

export async function register(req, res, conection) {
    let userBody = req.body;

    if (
        userBody.name == undefined ||
        userBody.email == undefined ||
        userBody.password == undefined
    ) {
        res.status(400);
        res.send("Invalid user");
    }

    //Hashing the password
    const salt = bcrypt.genSaltSync(10);
    userBody.password = await bcrypt.hash(userBody.password, salt);



    let user = new User(userBody.name, userBody.email, userBody.password);
    const db = await conection;
    let userDAO = new UserSQLiteDAO(db);
    let result = await userDAO.create(user);
    console.log("From the register", user.password);
    res.status(201);
    res.send("You have created : \n" + result);
}

export async function createRoutes(app, conection) {
    app.post("/user", async (req, res) => {
        await createUser(req, res, conection);
    });

    app.get("/user/:id", async (req, res) => {
        await readUser(req, res, conection);
    });

    app.get("/users", async (req, res) => {
        await readAllUser(req, res, conection);
    });

    app.put("/use/:id", async (req, res) => {
        await updateUser(req, res, conection);
    });

    app.delete("/user/:id", async (req, res) => {
        await deleteUser(req, res, conection);
    });

    app.delete("/user", async (req, res) => {
        await deleteAllUser(req, res, conection);
    });

    app.post("/login", async (req, res) => {
        await login(req, res, conection);
    });

    app.post("/register", async (req, res) => {
        await register(req, res, conection);
    });

}

