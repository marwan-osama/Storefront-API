"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const authorization_1 = __importDefault(require("../middleware/authorization"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
const store = new user_1.UserStore;
const usersRouter = (app) => {
    app.get("/users", authorization_1.default, index);
    app.get("/users/:user_id", authorization_1.default, show);
    app.post("/users", create);
};
const index = async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const show = async (req, res) => {
    try {
        const id = parseInt(req.params.user_id);
        const user = await store.show(id);
        res.json(user);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const create = async (req, res) => {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const password = req.body.password;
        if (!firstname || !lastname || !password) {
            res.status(400);
            res.json({ "error": "please provide the required arguments in request body (firstname, lastname, password)" });
            return;
        }
        const user = await store.create(firstname, lastname, password);
        const token = jsonwebtoken_1.default.sign(user, jwtSecret);
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.default = usersRouter;
