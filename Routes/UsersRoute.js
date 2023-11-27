import { UserSQLiteDAO } from "../repositories/UserSQLiteDAO.js";
import { User } from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import * as utils from "../Utils/Utils.js";
import 'dotenv/config';
//Import the .env file

//We need to check the id in each route
//We need to check the body in each route
let refreshTokens = [];

export async function createUser(req, res, conection) {
    let userBody = req.body;
    console.log(req.body);
    const check = utils.checkAttributes(userBody);

    //Check if there is empty string
    //Check email 
    
    let isEmailGood = userBody.email.includes("@");
    console.log(isEmailGood)
    if(isEmailGood == false){
        res.status(400);
        res.send({error: "Email is not valid", status: 400, ok:false});
        console.log("Email is not valid")
        return;
    }

    //CHeck for special  characters in name or email or password
    let isNameGood = utils.checkForSpecialCharacters(userBody.name);    
    let isPasswordGood = utils.checkForSpecialCharacters(userBody.password);
    let isEmailGood2 = utils.checkForSpecialCharacters(userBody.email);

    if(isNameGood.ok == false ){
        res.status(isNameGood.status);
    
        res.send({error: "Name is not valid or has special characters", status: 400, ok:false});
        console.log("Name is not valid or has special characters")
        return;
    }
    if(isPasswordGood.ok == false ){
        res.status(isPasswordGood.status);

        res.send({error: "Password is not valid or has special characters", status: 400, ok:false});

        return;
    }




    if (check.ok == false) {
        res.status(check.status);
        res.send(check);
        return;
    }

    const userCheck = await isUserExist(conection, userBody.email);
    if(userCheck.ok == false){
        res.status(userCheck.status)
        res.send(userCheck.error);
        return;
    }

    if (userBody.role == undefined) {
        userBody.role = 0;
    }

    let user = new User(userBody.name, userBody.email, userBody.password,userBody.role);
    const db = await conection;
    let userDAO = new UserSQLiteDAO(db);
    let result = await userDAO.create(user);

    res.status(201);
    res.send(result);
    return {ok:true}
}

export async function readUser(req, res, conection) {
    let id = req.params.id;
    if(utils.checkId(id).ok == false){
        return utils.checkId(id);
    }
    const db = await conection;
    let userDAO = new UserSQLiteDAO(db);
    let result = await userDAO.read(id);
    res.status(200);
    res.send(result);
}

export async function updateUser(req, res, conection) {
    let id = req.params.id;
    let userBody = req.body;
    userBody = JSON.parse(JSON.stringify(userBody));

    if(utils.checkId(id).ok == false){
        return utils.checkId(id);
    }
    if (utils.checkAttributes(userBody).ok == false) {
    console.log(userBody);

        const error = { error: "User not found to update", status: 404, ok:false};
        res.status(404);
        res.send(error);
        return;
    }
    if (userBody.role == undefined ) {
        userBody.role = 0;
    }



    const db = await conection;
    let userDAO = new UserSQLiteDAO(db);
    let result = await userDAO.update(userBody, id);

    //Unhashed password
    let password = userBody.password;
    //Unhashing the password using the env.
    let unHashedPassword = await bcrypt.hash(password, 10);


    res.status(200);
    res.send(result);
}

export async function deleteUser(req, res, conection) {
    let id = req.params.id;
    if(utils.checkId(id).ok == false){
        res.status(400);
        res.send(utils.checkId(id));
        return utils.checkId(id);
    }
    const db = await conection;
    let userDAO = new UserSQLiteDAO(db);
    let result = await userDAO.delete(id);

    if (result == undefined) {
        const error = { error: "User not found to delete", status: 40, ok:false};
        res.status(404);
        res.send(error);
        return;
    } 
    res.status(200);
    res.send(result);

}

//===================================================================================================

export async function readUsers(req, res, conection) {
    const db = await conection;
    let userDAO = new UserSQLiteDAO(db);
    let result = await userDAO.readAll();
    if(result.length == 0){
        const error = { error: "There are no users", status: 404};
        res.status(404);
        res.send(error);
    }
    res.status(200);
    res.send(result);
}

export async function getLastId(conection) {
    const db = await conection;
    let userDAO = new UserSQLiteDAO(db);
    let result = await userDAO.getLastId();
    return result;
}

export async function login(req, res, conection) {
    let userBody = req.body;
    if (utils.checkAttributes(userBody).ok == false) {
        const error = { error: "Not valid data", status: 404};
        res.status(error.status);
        res.send(error);
        return;
    }



    //In this case we need to use readByEmail because we need to take the password from the database
    let user = await readByEmail(conection, userBody.email);
    if (user == undefined) {
        const error = { error: "User not found to login", status: 404, user: user, ok:false};
        res.status(error.status);
        res.send(error);
        return;
    }
    let password = user.password;
    let resultComp = await bcrypt.compare(userBody.password, password);

    if (resultComp == false) {
        const error = { error: "Password not valid", status: 400, ok:false};
        userBody.password = password;
        res.status(error.status);
        res.send(error);
        return;
    }
    const accessToken = generateAccessToken({name: user.name, email: user.email, role: user.role});
    const refreshToken = jwt.sign({name: user.name, email: user.email, role: user.role}, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);

    res.status(200);
    res.send({ accessToken: accessToken,refreshToken: refreshToken});
};

export async function register(req, res, conection) {
    let userBody = req.body;

    //TODO: Check if we need the checkAttributes function
    const check = utils.checkAttributes(userBody);
    if (check.ok == false) {res.status(check.status);res.send(check.error);return;}


    //Hashing the password
    const salt = bcrypt.genSaltSync(10);
    userBody.password = await bcrypt.hash(userBody.password, salt);

    await createUser(req,res,conection);
    return;
}


async function readByEmail(conection,email){
    const db = await conection;
    const userDAO = new UserSQLiteDAO(db);
    return userDAO.readByEmail(email);
}

async function isUserExist(conection,email){

    const userCheck = await readByEmail(conection, email);
    if(userCheck != undefined){
        const error = { error: "User already exists", status: 409, ok:false};
        return error;
    }
    return {ok:true}
}


export async function createRoutes(app, conection) {
    app.post("/user", async (req, res) => {
        await createUser(req, res, conection);
    });

    app.get("/user/:id", async (req, res) => {
        await readUser(req, res, conection);
    });

    app.get("/users",async (req, res) => {
        await readUsers(req, res, conection);
    });

    app.put("/user/:id", async (req, res) => {
        await updateUser(req, res, conection);
    });

    app.delete("/user/:id", async (req, res) => {
        await deleteUser(req, res, conection);
    });


    app.post("/login", async (req, res) => {
        await login(req, res, conection);
    });

    app.post("/register", async (req, res) => {
        await register(req, res, coanection);
    });

    app.post("/token", async (req, res) => {
        const refreshToken = req.body.token;
        if(refreshToken == null){
            return res.sendStatus(401);
        }
        if(!refreshTokens.includes(refreshToken)){
            return res.sendStatus(403);
        }


        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if(err){
                return res.sendStatus(403);
            }
            console.log("The refresh token: " + refreshToken , "size: " + refreshTokens.length);
            const accessToken =  generateAccessToken({name: user.name, email: user.email, role: user.role});
            res.json({accessToken: accessToken});
        })
    });

}

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null){
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}

function generateAccessToken(user){
    if (!user) throw new Error("User data is required for token generation");
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
}