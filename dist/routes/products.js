"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const authorization_1 = __importDefault(require("../middleware/authorization"));
const store = new product_1.ProductStore;
const productsRouter = (app) => {
    app.get("/products", index);
    app.get("/products/:product_id", show);
    app.post("/products", authorization_1.default, create);
};
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const show = async (req, res) => {
    try {
        const id = parseInt(req.params.product_id);
        const product = await store.show(id);
        res.json(product);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const create = async (req, res) => {
    try {
        const name = req.body.product_name;
        const price = parseInt(req.body.product_price);
        if (!name || !price) {
            res.status(400);
            res.json({ "error": "please provide the required arguments in request body (product_name, product_price)" });
            return;
        }
        const products = await store.create(name, price);
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.default = productsRouter;
