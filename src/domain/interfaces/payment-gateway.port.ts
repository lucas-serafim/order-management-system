export interface CreatePaymentIntentImpl {
    amount: number;
    paymentMethod: string;
}

export interface ConfirmPaymentIntentImpl {
    transactionId: string;
    paymentMethod: string;
}