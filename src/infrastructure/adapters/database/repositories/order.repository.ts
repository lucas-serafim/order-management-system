import { Repository } from "typeorm";
import { Order } from "../../../../domain/entities/order.entity";
import { OrderRepositoryPort } from "../../../../domain/ports/order.port";
import { OrderEntity } from "../entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";
import { OrderMapper } from "../mappers/order.mapper";
import { OrderFilterImpl } from "../../../../domain/interfaces/order.interface";
import { PaginationImpl } from "../../../../domain/interfaces/pagination.interface";
import { OrderStatusEnum } from "../../../../domain/enums/order-status.enum";

export class OrderRepository implements OrderRepositoryPort {

    constructor(
        @InjectRepository(OrderEntity) private readonly repository: Repository<OrderEntity>
    ) { };

    async create(order: Order): Promise<void> {
        const input = OrderMapper.toOrmEntity(order)
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

    async cancel(order: Order): Promise<void> {
        const status = order.getStatus();

        await this.repository.update({
            id: order.getId()
        }, { status });
    }

    async filter(params: OrderFilterImpl): Promise<PaginationImpl> {
        const { currentPage, pageSize, ...rest } = params;

        const [response, total] = await this.repository.findAndCount({
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
            where: rest
        });

        const orders = OrderMapper.toDomainList(response);

        return {
            items: orders,
            currentPage,
            pageSize,
            total
        }
    }
}