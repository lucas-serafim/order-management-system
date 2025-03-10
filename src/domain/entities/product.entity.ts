import { randomUUID } from "node:crypto";

interface ProductImpl {
    id?: string;
    name: string;
    description: string;
    price: number;
    stock: number;
}

export class Product {

    private id: string;
    private name: string;
    private description: string;
    private price: number;
    private stock: number;

    constructor(params: ProductImpl) {
        this.id = params.id ?? randomUUID();

        this.name = params.name;
        this.description = params.description;
        this.price = params.price;
        this.stock = params.stock;
    };

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getPrice() {
        return this.price;
    }

    getStock() {
        return this.stock;
    }
}