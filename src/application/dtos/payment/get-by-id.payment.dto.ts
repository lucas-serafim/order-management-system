import { Payment } from "../../../domain/entities/payment.entity";
import { PaymentMethodEnum } from "../../../domain/enums/payment-method.enum";
import { PaymentStatusEnum } from "../../../domain/enums/payment-status.enum";

export class OutputGetByIdPaymentDto {
    id: string;
    orderId: string;
    status: PaymentStatusEnum;
    paymentMethod: PaymentMethodEnum;
    transactionId?: string;

    constructor(payment: Payment) {
        this.id = payment.getId();
        this.orderId = payment.getOrderId();
        this.status = payment.getStatus();
        this.paymentMethod = payment.getPaymentMethod();
        this.transactionId = payment.getTransactionId();
    }
}