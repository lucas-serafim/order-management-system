import { PaymentRepositoryPort } from "../../../domain/ports/payment.port";
import { OutputGetByIdPaymentDto } from "../../dtos/payment/get-by-id.payment.dto";

export class GetByIdPaymentUsecase {
    constructor(
        private readonly paymentRepository: PaymentRepositoryPort
    ) { };

    async execute(paymentId: string): Promise<any> {
        const payment = await this.paymentRepository.getById(paymentId);
        return new OutputGetByIdPaymentDto(payment);
    }
}