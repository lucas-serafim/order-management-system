import { OrderRepositoryPort } from "../../../domain/ports/order.port";
import { InputFilterOrderDto, OutputFilterOrderDto } from "../../dtos/order/filter.order.dto";

export class FilterOrderUsecase {
    constructor(
        private readonly orderRepository: OrderRepositoryPort
    ) {};

    async execute(params: InputFilterOrderDto): Promise<OutputFilterOrderDto> {
        return await this.orderRepository.filter(params);
    }
}