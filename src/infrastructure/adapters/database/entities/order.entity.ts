import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { OrderStatusEnum } from "../../../../domain/enums/order-status.enum";
import { ProductEntity } from "./product.entity";

@Entity("orders")
export class OrderEntity {

    @PrimaryColumn("uuid")
    id: string;

    @Column("uuid")
    customerId: string;

    @Column("json")
    items: ProductEntity[];

    @Column("float")
    totalAmount: number;

    @Column("varchar")
    status: string;

    @Column("varchar")
    createdAt: string;

    @Column("varchar")
    updatedAt: string;
}