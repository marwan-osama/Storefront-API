import request from "supertest";
import app from "../server";
import jwt from "jsonwebtoken";

const jwtSecret = (process.env.JWT_SECRET as unknown) as string;

describe("--Routes specs--", () => {
    describe("users Routes tests", () => {
        it("should return a jwt token when creating a user", async () => {
            const response = await request(app).post("/users").send({firstname: "marwan", lastname: "osama", password: "password"});
            expect(jwt.verify(response.body.token, jwtSecret)).toBeDefined();
        })

        it("shouldn't be able to get users without authorization token (status code 401)", async () => {
            const response = await request(app).get("/users");
            expect(response.status).toEqual(401);
        })
    })

    describe("orders Routes tests", () => {
        it("shouldn't be able to get order without authorization token (status code 401)", async () => {
            const response = await request(app).get("/orders/1");
            expect(response.status).toEqual(401);
        })
    })

    describe("products Routes tests", () => {
        it("should be able to get products (status code 200)", async () => {
            const response = await request(app).get("/products");
            expect(response.status).toEqual(200);
        })

        it("shouldn't be able to create a product without authorization token (status code 401)",async () => {
            const response = await request(app).post("/products");
            expect(response.status).toEqual(401);
        })
    })
})
