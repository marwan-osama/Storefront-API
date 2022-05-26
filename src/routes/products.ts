import { ProductStore } from "../models/product";
import express from "express";
import authorize from "../middleware/authorization";

const store = new ProductStore;

const productsRouter = (app: express.Application) => {
    app.get("/products", index);
    app.get("/products/:product_id", show);
    app.post("/products", authorize, create);
}

const index = async (_req: express.Request, res: express.Response) => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}
const show = async (req: express.Request, res: express.Response) => {
    try {
        const id = parseInt(req.params.product_id);
        const product = await store.show(id);
        res.json(product);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}
const create = async (req: express.Request, res: express.Response) => {
    try {
        const name = req.body.product_name;
        const price = parseInt(req.body.product_price);
        if (!name || !price) {
            res.status(400);
            res.json({"error": "please provide the required arguments in request body (product_name, product_price)"});
            return;
        }
        const products = await store.create(name, price);
        res.json(products);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

export default productsRouter;