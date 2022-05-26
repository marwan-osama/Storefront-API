"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const tokenSecret = process.env.JWT_SECRET;
exports.default = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        jsonwebtoken_1.default.verify(token, tokenSecret);
        res.locals.decodedTkn = jsonwebtoken_1.default.decode(token, { json: true });
    }
    catch (err) {
        res.status(401);
        res.json({ "error": `unable to authorize: ${err}` });
        return;
    }
    next();
};
