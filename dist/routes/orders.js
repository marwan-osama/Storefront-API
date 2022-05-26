"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const authorization_1 = __importDefault(require("../middleware/authorization"));
const store = new order_1.OrderStore;
const ordersRouter = (app) => {
    app.get("/orders/:user_id", authorization_1.default, show);
    app.post("/orders/:user_id", authorization_1.default, addProducts);
};
const show = async (req, res) => {
    try {
        const id = parseInt(req.params.user_id);
        const order = await store.show(id);
        res.json(order);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const addProducts = async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id);
        const product_id = req.body.product_id;
        const quantity = parseInt(req.body.quantity) || 1;
        if (!product_id) {
            res.status(400);
            res.json({ "error": "please provide the required arguments in request body (user_id, product_id)" });
        }
        const products = await store.addProducts(user_id, product_id, quantity);
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.default = ordersRouter;
