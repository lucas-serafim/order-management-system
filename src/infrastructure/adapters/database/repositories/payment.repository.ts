import { Repository } from "typeorm";
import { Payment } from "../../../../domain/entities/payment.entity";
import { PaymentRepositoryPort } from "../../../../domain/ports/payment.port";
import { PaymentEntity } from "../entities/payment.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class PaymentRepository implements PaymentRepositoryPort {

    constructor(
        @InjectRepository(PaymentEntity) private readonly repository: Repository<PaymentEntity>
    ) {};

    async create(payment: Payment): Promise<void> {
        const input = {
            id: payment.getId(),
            orderId: payment.getOrderId(),
            paymentMethod: payment.getPaymentMethod(),
            status: payment.getStatus(),
            transactionId: payment.getTransactionId()
        }
        
        await  this.repository.save(input)
    }
}