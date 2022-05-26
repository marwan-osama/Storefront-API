import client from '../database';
import bcrypt, { hashSync } from 'bcrypt';

const pepper = process.env.HASHING_PEPPER;
const saltRounds = parseInt(process.env.HASHING_SALT_ROUNDS as unknown as string);
const salt = bcrypt.genSaltSync(saltRounds);

export type User = {
    id: number,
    firstname: string,
    lastname: string,
    password_digest?: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT id, firstname, lastname FROM users';
            const users = await conn.query(sql);
            conn.release();
            return users.rows;
        } catch (error) {
            throw new Error(`Could not get users. Error: ${error}`);
        }
    }
    async show(id: number): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT id, firstname, lastname FROM users WHERE id=$1';
            const users = await conn.query(sql, [id]);
            conn.release();
            return users.rows[0];
        } catch (error) {
            throw new Error(`Could not get user with id=${id}. Error: ${error}`);
        }
    }
    async create(firstname: string, lastname: string, password: string): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users(firstname, lastname, password_digest) VALUES ($1, $2, $3) RETURNING id, firstname, lastname';
            const password_digest = hashSync(password + pepper, salt);
            const users = await conn.query(sql, [firstname, lastname, password_digest]);
            conn.release();
            return users.rows[0];
        } catch (error) {
            throw new Error(`Could not create user. Error: ${error}`);
        }
    }
}