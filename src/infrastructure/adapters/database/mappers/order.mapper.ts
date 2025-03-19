import { Order } from "../../../../domain/entities/order.entity";
import { OrderEntity } from "../entities/order.entity";
import { ProductMapper } from "./product.mapper";

export class OrderMapper {

    static toDomain(orderEntity: OrderEntity): Order {
        const order = new Order(orderEntity);

        const products = orderEntity.items.map(current => ProductMapper.toDomain(current));
        products.forEach(current => order.addProduct(current));

        return order;
    }

    static toOrmEntity(order: Order): OrderEntity {
        const orderEntity = new OrderEntity()

        orderEntity.id = order.getId();
        orderEntity.customerId = order.getCustomerId();
        orderEntity.status = order.getStatus();
        orderEntity.totalAmount = order.getTotalAmount();
        orderEntity.createdAt = order.getCreatedAt();
        orderEntity.updatedAt = order.getUpdatedAt();

        orderEntity.items = order.getItems().map(current => ProductMapper.toOrmEntity(current));

        return orderEntity;
    }
}