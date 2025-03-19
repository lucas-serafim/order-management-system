import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("payments")
export class PaymentEntity {

    @PrimaryColumn("uuid")
    id: string;
    
    @Column("uuid")
    orderId: string;

    @Column("varchar")
    status: string;

    @Column("varchar")
    paymentMethod: string;

    @Column("varchar")
    transactionId: string;
}