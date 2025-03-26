import { Order } from "../../../domain/entities/order.entity";

export interface InputFilterOrderDto {
    pageSize: number;
    currentPage: number;
    id?: string;
    customerId?: string;
    status?: string;
}

export interface OutputFilterOrderDto {
    items: Order[];
    currentPage: number;
    pageSize: number;
    total: number;
}