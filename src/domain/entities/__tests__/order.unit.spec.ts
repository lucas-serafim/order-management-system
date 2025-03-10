import { randomUUID } from "node:crypto";
import { Order } from "../order.entity";
import { Product } from "../product.entity";

describe("Order unit tests", () => {

    it("should throw error when try to change status to paid when current status is different to pending", () => {
        const product = new Product({
            name: "television",
            description: "eletronic product",
            price: 1499.99,
            stock: 50
        });

        const order = new Order({
            customerId: randomUUID(),
            items: [product]
        });

        order.pay();
        order.cancel();

        expect(() => order.pay()).toThrow("Order cannot be paid in its current state");
    });

    it("should throw error when try to change status to shipped, but the order was not paid", () => {
        const product = new Product({
            name: "television",
            description: "eletronic product",
            price: 1499.99,
            stock: 50
        });

        const order = new Order({
            customerId: randomUUID(),
            items: [product]
        });

        expect(() => order.ship()).toThrow("Only paid orders can be shipped");
    });

    it("should throw error when try to cancel order with these states: shipped or delivered", () => {
        const product = new Product({
            name: "television",
            description: "eletronic product",
            price: 1499.99,
            stock: 50
        });

        const order = new Order({
            customerId: randomUUID(),
            items: [product]
        });

        order.pay();
        order.ship();

        expect(() => order.cancel()).toThrow("Only shipped or delivered orders cannot be cancelled");
    });
});