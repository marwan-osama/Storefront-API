import express, { Request, Response } from 'express';
import ordersRouter from './routes/orders';
import productsRouter from './routes/products';
import usersRouter from './routes/users';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express();
const address: string = "localhost:3000";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

ordersRouter(app);
productsRouter(app);
usersRouter(app);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
})

export default app;