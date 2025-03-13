import { Product } from "../../../domain/entities/product.entity";

export class InputCreateProductDto {
    name: string;
    description: string;
    price: number;
    stock: number;

    constructor(product: Product) {
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.stock = product.getStock();
    }
}

export class OutputCreateProductDto {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;

    constructor(product: Product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.stock = product.getStock();
    }
}