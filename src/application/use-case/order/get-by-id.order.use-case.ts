import { OrderRepositoryPort } from "../../../domain/ports/order.port";
import { OutputGetByIdOrderDto } from "../../dtos/order/get-by-id.order.dto";

export class GetByIdOrderUsecase {
    constructor(
        private readonly orderRepository: OrderRepositoryPort
    ) { };

    async execute(orderId: string): Promise<OutputGetByIdOrderDto> {
        const order = await this.orderRepository.getById(orderId);
        return new OutputGetByIdOrderDto(order);
    }
}