import { CreatePaymentIntentImpl } from "../interfaces/payment-gateway.port";

export interface PaymentGatewayPort {
    createPaymentIntent(params: CreatePaymentIntentImpl): Promise<{ transactionId: string }>;

    confirmPaymentIntent(transactionId: string): Promise<void>;
}