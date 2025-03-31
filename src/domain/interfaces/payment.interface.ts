export interface PaymentImpl {
    id?: string;
    orderId: string;
    status?: string;
    paymentMethod: string;
    transactionId?: string;
}