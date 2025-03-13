import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class OrdersTable1741876732682 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "orders",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary:true
                    },
                    {
                        name: "customerId",
                        type: "uuid"
                    },
                    {
                        name: "items",
                        type: "json"
                    },
                    {
                        name: "totalAmount",
                        type: "float"
                    },
                    {
                        name: "status",
                        type: "varchar"
                    },
                    {
                        name: "createdAt",
                        type: "varchar"
                    },
                    {
                        name: "updatedAt",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orders");
    }
}