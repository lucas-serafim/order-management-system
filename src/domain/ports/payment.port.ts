import { Payment } from "../entities/payment.entity";

export interface PaymentRepositoryPort {
    create(payment: Payment): Promise<void>;

    getById(paymentId: string): Promise<Payment>;
}