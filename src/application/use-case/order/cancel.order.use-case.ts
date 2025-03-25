import { OrderRepositoryPort } from "../../../domain/ports/order.port";
import { InputCancelOrderDto, OutputCancelOrderDto } from "../../dtos/order/cancel.order.dto";

export class CancelOrderUsecase {

    constructor(
        private readonly orderRepository: OrderRepositoryPort
    ) { };

    async execute(params: InputCancelOrderDto): Promise<OutputCancelOrderDto> {
        const order = await this.orderRepository.getById(params.orderId);
        order.cancel();

        await this.orderRepository.cancel(order.getId());

        return new OutputCancelOrderDto(order);
    }
}