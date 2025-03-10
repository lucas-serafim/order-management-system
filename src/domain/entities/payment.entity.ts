import { PaymentMethodEnum } from "../enums/payment-method.enum";
import { PaymentStatusEnum } from "../enums/payment-status.enum";

export class Payment {

    private id: string;
    private orderId: string;
    private status: PaymentStatusEnum;
    private paymentMethod: PaymentMethodEnum;
    private transactionId: string;

}