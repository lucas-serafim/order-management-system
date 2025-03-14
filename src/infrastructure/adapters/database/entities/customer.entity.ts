import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("customers")
export class CustomerEntity {

    @PrimaryColumn("uuid")
    id: string;

    @Column("varchar")
    name: string;

    @Column("varchar")
    email: string;

    @Column("varchar")
    phone: string;

    @Column("varchar")
    address: string;
}