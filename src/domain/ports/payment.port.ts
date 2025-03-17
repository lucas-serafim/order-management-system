import { Payment } from "../entities/payment.entity";

export interface PaymentRepositoryPort {
    create(payment: Payment): Promise<void>;
}