import { Order } from "../entities/order.entity";

export interface OrderRepositoryPort {

    create(order: Order): Promise<void>;

    // updateStatus(): Promise<any>;

    // cancel(): Promise<any>;

    // findByCustomerId(): Promise<any>;
}