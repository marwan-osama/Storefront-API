"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async show(user_id) {
        try {
            const conn = await database_1.default.connect();
            const orderSql = 'SELECT * FROM orders WHERE user_id=$1';
            const order = (await conn.query(orderSql, [user_id])).rows[0];
            if (!order) {
                return await this.create(user_id, "active");
            }
            const productsSql = 'SELECT product_id, quantity FROM order_products WHERE order_id=$1';
            const products = (await conn.query(productsSql, [order.id])).rows;
            conn.release();
            return { ...order, products: products };
        }
        catch (error) {
            throw new Error(`Could not get user id=${user_id} current order. Error: ${error}`);
        }
    }
    async create(user_id, status) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders(user_id, status) VALUES ($1, $2) RETURNING *';
            const orders = (await conn.query(sql, [user_id, status])).rows[0];
            conn.release();
            return { ...orders, products: [] };
        }
        catch (error) {
            throw new Error(`Could not create order. Error: ${error}`);
        }
    }
    async addProducts(user_id, product_id, quantity) {
        try {
            const conn = await database_1.default.connect();
            const orderSql = `SELECT * FROM orders WHERE user_id=$1`;
            const order = (await conn.query(orderSql, [user_id])).rows[0] || await this.create(user_id, "active");
            const sql = 'INSERT INTO order_products(order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            const products = (await conn.query(sql, [order.id, product_id, quantity])).rows;
            conn.release();
            return products;
        }
        catch (error) {
            throw new Error(`Could not add product with id=${product_id} to user with id=${user_id} order. Error: ${error}`);
        }
    }
}
exports.OrderStore = OrderStore;
