import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("products")
export class ProductEntity {

    @PrimaryColumn("uuid")
    id: string;

    @Column("varchar")
    name: string;

    @Column("varchar")
    description: string;

    @Column("float")
    price: number;

    @Column("integer")
    stock: number;
}