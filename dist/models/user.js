"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importStar(require("bcrypt"));
const pepper = process.env.HASHING_PEPPER;
const saltRounds = parseInt(process.env.HASHING_SALT_ROUNDS);
const salt = bcrypt_1.default.genSaltSync(saltRounds);
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT id, firstname, lastname FROM users';
            const users = await conn.query(sql);
            conn.release();
            return users.rows;
        }
        catch (error) {
            throw new Error(`Could not get users. Error: ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT id, firstname, lastname FROM users WHERE id=$1';
            const users = await conn.query(sql, [id]);
            conn.release();
            return users.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get user with id=${id}. Error: ${error}`);
        }
    }
    async create(firstname, lastname, password) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users(firstname, lastname, password_digest) VALUES ($1, $2, $3) RETURNING id, firstname, lastname';
            const password_digest = (0, bcrypt_1.hashSync)(password + pepper, salt);
            const users = await conn.query(sql, [firstname, lastname, password_digest]);
            conn.release();
            return users.rows[0];
        }
        catch (error) {
            throw new Error(`Could not create user. Error: ${error}`);
        }
    }
}
exports.UserStore = UserStore;
