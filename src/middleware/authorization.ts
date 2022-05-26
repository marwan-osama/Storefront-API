import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const tokenSecret = (process.env.JWT_SECRET as unknown) as string;

export default (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization?.split(" ")[1] as unknown as string;
        jwt.verify(token, tokenSecret);
        res.locals.decodedTkn = jwt.decode(token, {json: true});
    } catch (err) {
        res.status(401);
        res.json({"error": `unable to authorize: ${err}`});
        return;
    }
    next();
}