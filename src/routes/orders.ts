import { OrderStore } from "../models/order";
import express from "express";
import authorize from "../middleware/authorization";

const store = new OrderStore;

const ordersRouter = (app: express.Application) => {
    app.get("/orders/:user_id", authorize, show);
    app.post("/orders/:user_id", authorize, addProducts);
}

const show = async (req: express.Request, res: express.Response) => {
    try {
        const id = parseInt(req.params.user_id)
        const order = await store.show(id);
        res.json(order);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}
const addProducts = async (req: express.Request, res: express.Response) => {
    try {
        const user_id = parseInt(req.params.user_id);
        const product_id = req.body.product_id;
        const quantity = parseInt(req.body.quantity) || 1;
        if (!product_id) {
            res.status(400);
            res.json({"error": "please provide the required arguments in request body (user_id, product_id)"});
        }
        const products = await store.addProducts(user_id, product_id, quantity);
        res.json(products);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

export default ordersRouter;