import { Payment } from "../../../domain/entities/payment.entity";
import { OrderRepositoryPort } from "../../../domain/ports/order.port";
import { PaymentRepositoryPort } from "../../../domain/ports/payment.port";
import { InputCreatePaymentDto, OutputCreatePaymentDto } from "../../dtos/payment/create.payment.dto";

export class CreatePaymentUsecase {

    constructor(
        private readonly paymentRepository: PaymentRepositoryPort,
        private readonly orderRepository: OrderRepositoryPort
    ) { };

    async execute(params: InputCreatePaymentDto): Promise<OutputCreatePaymentDto> {
        await this.orderRepository.getById(params.orderId);

        const payment = new Payment(params);

        await this.paymentRepository.create(payment);

        return new OutputCreatePaymentDto(payment);
    }
}