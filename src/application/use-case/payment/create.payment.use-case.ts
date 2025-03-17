import { Payment } from "../../../domain/entities/payment.entity";
import { PaymentRepositoryPort } from "../../../domain/ports/payment.port";
import { OrderRepository } from "../../../infrastructure/adapters/database/repositories/order.repository";
import { InputCreatePaymentDto, OutputCreatePaymentDto } from "../../dtos/payment/create.payment.dto";

export class CreatePaymentUsecase {

    constructor(
        private readonly paymentRepository: PaymentRepositoryPort
    ) { };

    async execute(params: InputCreatePaymentDto): Promise<OutputCreatePaymentDto> {
        // TODO: verify if order exists

        const payment = new Payment(params);

        await this.paymentRepository.create(payment);

        return new OutputCreatePaymentDto(payment);
    }
}