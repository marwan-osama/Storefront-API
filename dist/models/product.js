"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const users = await conn.query(sql);
            conn.release();
            return users.rows;
        }
        catch (error) {
            throw new Error(`Could not get products. Error: ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id=$1';
            const users = await conn.query(sql, [id]);
            conn.release();
            return users.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get product with id=${id}. Error: ${error}`);
        }
    }
    async create(name, price) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products(name, price) VALUES ($1, $2) RETURNING *';
            const users = await conn.query(sql, [name, price]);
            conn.release();
            return users.rows[0];
        }
        catch (error) {
            throw new Error(`Could not create product. Error: ${error}`);
        }
    }
}
exports.ProductStore = ProductStore;
