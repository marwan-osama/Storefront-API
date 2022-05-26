import { OrderStore } from "../models/order";
import { UserStore } from "../models/user";
import { ProductStore } from "../models/product";

const userStore = new UserStore;
const productStore = new ProductStore;
const orderStore = new OrderStore;

describe ("--Models specs--", () => {
    describe ("user model tests", () => {
        it("adding a new user to users table", async () => {
            const user = await userStore.create("test firstname", "test lastname", "test password");
            expect(user).toEqual({id: 1, firstname: "test firstname", lastname: "test lastname"});
        })
        
        it("reading a user from users table", async () => {
            const user = await userStore.show(1);
            expect(user).toEqual({id: 1, firstname: "test firstname", lastname: "test lastname"});
        })
    })
    
    describe ("products model tests", () => {
        it("adding a new product to products table", async () => {
            const product = await productStore.create("test product 1", 10);
            expect(product).toEqual({id: 1, name: "test product 1", price: 10});
        })
        
        it("reading a product from products table", async () => {
            const product = await productStore.show(1);
            expect(product).toEqual({id: 1, name: "test product 1", price: 10});
        })
    })
    
    describe ("order model tests", () => {
        it("adding a new order to orders table", async () => {
            const order = await orderStore.create(1, "active");
            expect(order).toEqual({id: 1, user_id: 1, status: "active", products:[]});
        })
        
        it("reading a order from orders table", async () => {
            const order = await orderStore.show(1);
            expect(order).toEqual({id: 1, user_id: 1, status: "active", products:[]});
        })
    
        it("adding a product to an order", async () => {
            const productAdded = await orderStore.addProducts(1, 1, 2);
            expect(productAdded).toEqual({order_id: 1, product_id: 1, quantity: 2});
        })
    })
}) 