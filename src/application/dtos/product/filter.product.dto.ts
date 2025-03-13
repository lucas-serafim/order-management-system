import { Product } from "../../../domain/entities/product.entity";

export interface InputFilterProductDto {
    pageSize: number;
    currentPage: number;
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
}

export interface OutputFilterProductDto {
    items: Product[],
    pageSize: number;
    currentPage: number;
    total: number
}