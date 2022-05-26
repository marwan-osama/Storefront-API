"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const productStore = new product_1.ProductStore;
it("adding a new product to products table", async () => {
    const product = await productStore.create("test product 1", 10);
    expect(product).toEqual({ id: 1, name: "test product 1", price: 10 });
});
it("reading a product from products table", async () => {
    const product = await productStore.show(1);
    expect(product).toEqual({ id: 1, name: "test product 1", price: 10 });
});
