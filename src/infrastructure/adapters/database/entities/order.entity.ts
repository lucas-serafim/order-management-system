import { Column, Entity, PrimaryColumn } from "typeorm";
import { Product } from "../../../../domain/entities/product.entity";
import { OrderStatusEnum } from "../../../../domain/enums/order-status.enum";

@Entity("orders")
export class OrderEntity {

    @PrimaryColumn("uuid")
    id: string;

    @Column("uuid")
    customerId: string;

    @Column("json")
    items: Array<Product>;

    @Column("float")
    totalAmount: number;

    @Column("varchar")
    status: OrderStatusEnum;

    @Column("varchar")
    createdAt: string;

    @Column("varchar")
    updatedAt: string;
}