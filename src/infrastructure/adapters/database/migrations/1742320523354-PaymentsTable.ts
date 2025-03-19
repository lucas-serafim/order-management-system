import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PaymentsTable1742320523354 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "payments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "orderId",
                        type: "uuid"
                    },
                    {
                        name: "status",
                        type: "varchar"
                    },
                    {
                        name: "paymentMethod",
                        type: "varchar"
                    },
                    {
                        name: "transactionId",
                        type: "varchar"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payments");
    }
}