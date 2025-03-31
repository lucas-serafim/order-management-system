import { randomUUID } from "node:crypto";
import { PaymentMethodEnum } from "../enums/payment-method.enum";
import { PaymentStatusEnum } from "../enums/payment-status.enum";
import { PaymentImpl } from "../interfaces/payment.interface";

export class Payment {

    private id: string;
    private orderId: string;
    private status: PaymentStatusEnum;
    private paymentMethod: PaymentMethodEnum;
    private transactionId: string;

    constructor(params: PaymentImpl) {
        this.id = params.id ?? randomUUID();
        this.orderId = params.orderId;
        this.status = PaymentStatusEnum[params.status?.toLowerCase() as keyof typeof PaymentStatusEnum] ?? PaymentStatusEnum.pending;
        this.paymentMethod = PaymentMethodEnum[params.paymentMethod.toLowerCase() as keyof typeof PaymentMethodEnum];
        this.transactionId = params.transactionId ?? "";
    }

    completePayment() {
        if (this.status !== PaymentStatusEnum.pending)
            throw new Error(`Payment cannot be completed in current status: ${this.status}`); 

        this.status = PaymentStatusEnum.completed;
    }

    failPayment() {
        if (this.status !== PaymentStatusEnum.pending)
            throw new Error(`Payment cannot be failed in current status: ${this.status}`); 

        this.status = PaymentStatusEnum.failed;
    }

    getId() {
        return this.id;
    }

    getOrderId() {
        return this.orderId;
    }

    getStatus() {
        return this.status;
    }

    getPaymentMethod() {
        return this.paymentMethod;
    }

    getTransactionId() {
        return this.transactionId;
    }
}