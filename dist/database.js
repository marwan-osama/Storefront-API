"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;
const db = process.env.ENV === "dev" ? process.env.POSTGRES_DB : process.env.POSTGRES_TEST_DB;
exports.default = new pg_1.Pool({
    database: db,
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});
