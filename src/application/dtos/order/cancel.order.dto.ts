import { Order } from "../../../domain/entities/order.entity";
import { Product } from "../../../domain/entities/product.entity";
import { OrderStatusEnum } from "../../../domain/enums/order-status.enum";

export interface InputCancelOrderDto {
    orderId: string;
}


export class  OutputCancelOrderDto {
    id: string;
    customerId: string;
    items: Array<Product>;
    totalAmount: number;
    status: OrderStatusEnum;
    createdAt: string;
    updatedAt: string;

    constructor(order: Order) {
        this.id = order.getId();
        this.customerId = order.getCustomerId();
        this.items = order.getItems();
        this.totalAmount = order.getTotalAmount();
        this.status = order.getStatus();
        this.createdAt = order.getCreatedAt();
        this.updatedAt = order.getUpdatedAt();
    }
}