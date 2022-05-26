import { UserStore } from "../models/user";
import express from "express";
import authorize from "../middleware/authorization";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET as unknown as string; 

const store = new UserStore;

const usersRouter = (app: express.Application) => {
    app.get("/users", authorize, index);
    app.get("/users/:user_id", authorize, show);
    app.post("/users", create);
}

const index = async (_req: express.Request, res: express.Response) => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}
const show = async (req: express.Request, res: express.Response) => {
    try {
        const id = parseInt(req.params.user_id);
        const user = await store.show(id);
        res.json(user);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}
const create = async (req: express.Request, res: express.Response) => {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const password = req.body.password;
        if (!firstname || !lastname || !password) {
            res.status(400);
            res.json({"error": "please provide the required arguments in request body (firstname, lastname, password)"});
            return;
        }
        const user = await store.create(firstname, lastname, password);
        const token = jwt.sign(user, jwtSecret);
        res.json({token: token});
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

export default usersRouter;