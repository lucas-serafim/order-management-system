import { Product } from "../../../domain/entities/product.entity";

export interface InputUpdateProductDto {
    id: string;
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
}

export class OutputUpdateProductDto {
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