import { Order } from "../entities/order.entity";

export interface OrderRepositoryPort {

    create(order: Order): Promise<void>;

    getById(orderId: string): Promise<Order>;

    cancel(order: Order): Promise<void>;
}