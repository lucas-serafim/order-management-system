import { Repository } from "typeorm";
import { Payment } from "../../../../domain/entities/payment.entity";
import { PaymentRepositoryPort } from "../../../../domain/ports/payment.port";
import { PaymentEntity } from "../entities/payment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentMapper } from "../mappers/payment.mapper";
import { NotFoundException } from "@nestjs/common";

export class PaymentRepository implements PaymentRepositoryPort {

    constructor(
        @InjectRepository(PaymentEntity) private readonly repository: Repository<PaymentEntity>
    ) { };

    async create(payment: Payment): Promise<void> {
        const input = {
            id: payment.getId(),
            orderId: payment.getOrderId(),
            paymentMethod: payment.getPaymentMethod(),
            status: payment.getStatus(),
            transactionId: payment.getTransactionId()
        }

        await this.repository.save(input)
    }

    async getById(paymentId: string): Promise<Payment> {
        const response = await this.repository.findOne({
            where: {
                id: paymentId
            }
        });

        if (!response)
            throw new NotFoundException(`Payment not found. Payment id: ${paymentId}`)

        return PaymentMapper.toDomain(response);
    }
}