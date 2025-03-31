import Stripe from "stripe"
import { StripePaymentMethodEnum } from "../enums/payment-method.enum";
import { CreatePaymentIntentImpl } from "../../../../domain/interfaces/payment-gateway.port";
import { PaymentGatewayPort } from "../../../../domain/ports/payment-gateway.port";

const currency = "brl";

export class StripePaymentService implements PaymentGatewayPort {

    async createPaymentIntent(params: CreatePaymentIntentImpl): Promise<{ transactionId: string }> {
        const { amount, paymentMethod } = params;

        const stripePaymentMethod = StripePaymentMethodEnum[paymentMethod as keyof typeof StripePaymentMethodEnum];

        const privateKey = `${process.env.STRIPE_PRIVATE_KEY}`;
        
        const stripe = new Stripe(privateKey);

        const convertedAmount = amount * 100;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: convertedAmount,
            currency,
            payment_method: stripePaymentMethod
        });

        return {
            transactionId: paymentIntent.id
        };
    }

    async confirmPaymentIntent(transactionId: string): Promise<void> {
        const privateKey = `${process.env.STRIPE_PRIVATE_KEY}`;
        
        const stripe = new Stripe(privateKey);
        await stripe.paymentIntents.confirm(transactionId);
    }
}