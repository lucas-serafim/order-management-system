import { randomUUID } from "node:crypto";
import { OrderStatusEnum } from "../enums/order-status.enum";
import { Product } from "./product.entity";
import { OrderImpl } from "../interfaces/order.interface";


export class Order {

    private id: string;
    private customerId: string;
    private items: Array<Product>;
    private totalAmount: number;
    private status: OrderStatusEnum;
    private createdAt: string;
    private updatedAt: string;

    constructor(params: OrderImpl) {
        this.id = params.id ?? randomUUID();
        this.customerId = params.customerId;
        this.items = params.items;
        this.status = OrderStatusEnum.pending;
        this.createdAt = new Date().toISOString();
        this.updatedAt =  new Date().toISOString();

        this.setTotalAmount();
    };

    pay() {
        if (this.status !== OrderStatusEnum.pending) {
            throw new Error("Order cannot be paid in its current state");
        }

        this.status = OrderStatusEnum.paid;
    }
    
    ship() {
        if (this.status !== OrderStatusEnum.paid) {
            throw new Error("Only paid orders can be shipped");
        }

        this.status = OrderStatusEnum.shipped;
    }

    cancel() {
        if (this.status === OrderStatusEnum.shipped || this.status === OrderStatusEnum.delivered) {
            throw new Error("Only shipped or delivered orders cannot be cancelled");
        }

        this.status = OrderStatusEnum.cancelled;
    }

    getId() {
        return this.id;
    }

    getCustomerId() {
        return this.customerId;
    }

    getItems() {
        return this.items;
    }

    getTotalAmount() {
        return this.totalAmount;
    }

    getStatus() {
        return this.status;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getUpdatedAt() {
        return this.updatedAt;
    }

    private setTotalAmount() {
        let totalAmount: number = 0;

        this.items.forEach((current) => {
            totalAmount += current.getPrice()
        });

        this.totalAmount = totalAmount;
    }
}