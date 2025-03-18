import { Order } from "../../../../domain/entities/order.entity";
import { OrderEntity } from "../entities/order.entity";

export class OrderMapper {

    static toDomain(order: OrderEntity): Order {
        return new Order(order);
    }
}