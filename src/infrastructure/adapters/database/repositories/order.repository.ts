import { Repository } from "typeorm";
import { Order } from "../../../../domain/entities/order.entity";
import { OrderRepositoryPort } from "../../../../domain/ports/order.port";
import { OrderEntity } from "../entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class OrderRepository implements OrderRepositoryPort {

    constructor(
        @InjectRepository(OrderEntity) private readonly repository: Repository<OrderEntity>
    ) { };

    async create(order: Order): Promise<void> {
        const input = {
            id: order.getId(),
            customerId: order.getCustomerId(),
            items: order.getItems(),
            totalAmount: order.getTotalAmount(),
            status: order.getStatus(),
            createdAt: order.getCreatedAt(),
            updatedAt: order.getUpdatedAt()
        }

        await this.repository.save(input);
    }
}