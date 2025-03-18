import { Repository } from "typeorm";
import { Order } from "../../../../domain/entities/order.entity";
import { OrderRepositoryPort } from "../../../../domain/ports/order.port";
import { OrderEntity } from "../entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";
import { OrderMapper } from "../mappers/order.mapper";

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

    async getById(orderId: string): Promise<Order> {
        const response = await this.repository.findOne({
            where: {
                id: orderId
            }
        });

        if (!response)
            throw new NotFoundException(`Order not found. Order id: ${orderId}`);

        return OrderMapper.toDomain(response);
    }
}