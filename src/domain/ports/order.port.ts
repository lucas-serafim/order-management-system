import { Order } from "../entities/order.entity";
import { OrderFilterImpl } from "../interfaces/order.interface";
import { PaginationImpl } from "../interfaces/pagination.interface";

export interface OrderRepositoryPort {

    create(order: Order): Promise<void>;

    getById(orderId: string): Promise<Order>;

    cancel(order: Order): Promise<void>;

    filter(params: OrderFilterImpl): Promise<PaginationImpl>;
}