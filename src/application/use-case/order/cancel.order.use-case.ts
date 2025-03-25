import { OrderRepositoryPort } from "../../../domain/ports/order.port";
import { OutputCancelOrderDto } from "../../dtos/order/cancel.order.dto";

export class CancelOrderUsecase {

    constructor(
        private readonly orderRepository: OrderRepositoryPort
    ) { };

    async execute(orderId: string): Promise<OutputCancelOrderDto> {
        const order = await this.orderRepository.getById(orderId);
        order.cancel();

        await this.orderRepository.cancel(order);

        return new OutputCancelOrderDto(order);
    }
}