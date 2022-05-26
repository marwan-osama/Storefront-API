import client from "../database";

export type Product = {
    id: number,
    name: string,
    price: number
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const products = await conn.query(sql);
            conn.release();
            return products.rows;
        } catch (error) {
            throw new Error(`Could not get products. Error: ${error}`);
        }
    }
    async show(id: number): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=$1';
            const product = await conn.query(sql, [id]);
            conn.release();
            return product.rows[0];
        } catch (error) {
            throw new Error(`Could not get product with id=${id}. Error: ${error}`);
        }
    }
    async create(name: string, price: number): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO products(name, price) VALUES ($1, $2) RETURNING *';
            const product = await conn.query(sql, [name, price]);
            conn.release();
            return product.rows[0];
        } catch (error) {
            throw new Error(`Could not create product. Error: ${error}`);
        }
    }
}