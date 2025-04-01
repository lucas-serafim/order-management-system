import { ConfirmPaymentIntentImpl, CreatePaymentIntentImpl } from "../interfaces/payment-gateway.port";

export interface PaymentGatewayPort {
    createPaymentIntent(params: CreatePaymentIntentImpl): Promise<{ transactionId: string }>;

    confirmPaymentIntent(params: ConfirmPaymentIntentImpl): Promise<void>;
}