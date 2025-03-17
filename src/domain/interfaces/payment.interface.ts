import { PaymentMethodEnum } from "../enums/payment-method.enum";
import { PaymentStatusEnum } from "../enums/payment-status.enum";

export interface PaymentImpl {
    id?: string;
    orderId: string;
    status?: PaymentStatusEnum;
    paymentMethod: PaymentMethodEnum;
    transactionId?: string;
}