import { PaymentGatewayPort } from "../../../domain/ports/payment-gateway.port";
import { PaymentRepositoryPort } from "../../../domain/ports/payment.port";
import { OutputConfirmPaymentDto } from "../../dtos/payment/confirm.payment.dto";
import { InputCreatePaymentDto } from "../../dtos/payment/create.payment.dto";

export class ConfirmPaymentUsecase {

    constructor(
        private readonly paymentRepository: PaymentRepositoryPort,
        private readonly paymentGateway: PaymentGatewayPort
    ) { };

    async execute(paymentId: string): Promise<OutputConfirmPaymentDto> {
        const payment = await this.paymentRepository.getById(paymentId);

        await this.paymentGateway.confirmPaymentIntent(payment.getTransactionId());

        payment.completePayment();

        return new OutputConfirmPaymentDto(payment);
    }
}