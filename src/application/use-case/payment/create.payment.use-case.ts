import { Payment } from "../../../domain/entities/payment.entity";
import { OrderRepositoryPort } from "../../../domain/ports/order.port";
import { PaymentGatewayPort } from "../../../domain/ports/payment-gateway.port";
import { PaymentRepositoryPort } from "../../../domain/ports/payment.port";
import { InputCreatePaymentDto, OutputCreatePaymentDto } from "../../dtos/payment/create.payment.dto";

export class CreatePaymentUsecase {

    constructor(
        private readonly paymentRepository: PaymentRepositoryPort,
        private readonly orderRepository: OrderRepositoryPort,
        private readonly paymentGateway: PaymentGatewayPort
    ) { };

    async execute(params: InputCreatePaymentDto): Promise<OutputCreatePaymentDto> {
        const order = await this.orderRepository.getById(params.orderId);

        const { transactionId } = await this.paymentGateway.createPaymentIntent({
            amount: order.getTotalAmount(),
            paymentMethod: params.paymentMethod
        });

        const payment = new Payment({
            ...params,
            transactionId
        });

        await this.paymentRepository.create(payment);

        return new OutputCreatePaymentDto(payment);
    }
}