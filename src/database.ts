import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD
} = process.env;

const db = process.env.ENV === "test" ? process.env.TEST_DB : process.env.DB;
const port = process.env.ENV === "test" ? process.env.POSTGRES_TEST_PORT : process.env.POSTGRES_PORT;

export default new Pool({
    database: db,
    host: POSTGRES_HOST,
    port: parseInt((port as unknown) as string),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
})

