import { randomUUID } from "node:crypto"
import { PaymentMethodEnum } from "../../enums/payment-method.enum"
import { Payment } from "../payment.entity"
import { Product } from "../product.entity"
import { Order } from "../order.entity"
import { PaymentStatusEnum } from "../../enums/payment-status.enum"

describe("Unit test payment", () => {

    it("should change current status to completed", () => {
        const product = new Product({
            name: "television",
            description: "eletronic product",
            price: 1499.99,
            stock: 50
        });

        const order = new Order({
            customerId: randomUUID()
        });
        order.addProduct(product);

        const payment = new Payment({
            orderId: order.getId(),
            paymentMethod: PaymentMethodEnum.debit_card,
            transactionId: randomUUID()
        });

        payment.completePayment();

        expect(payment.getStatus()).toBe("COMPLETED");
    });

    it("should change current status to failed", () => {
        const product = new Product({
            name: "television",
            description: "eletronic product",
            price: 1499.99,
            stock: 50
        });

        const order = new Order({
            customerId: randomUUID()
        });
        order.addProduct(product);

        const payment = new Payment({
            orderId: order.getId(),
            paymentMethod: PaymentMethodEnum.debit_card,
            transactionId: randomUUID()
        });

        payment.failPayment();

        expect(payment.getStatus()).toBe("FAILED");
    });

    it("should throw an error when complete payment", () => {
        const product = new Product({
            name: "television",
            description: "eletronic product",
            price: 1499.99,
            stock: 50
        });

        const order = new Order({
            customerId: randomUUID()
        });
        order.addProduct(product);

        const payment = new Payment({
            orderId: order.getId(),
            status: PaymentStatusEnum.failed,
            paymentMethod: PaymentMethodEnum.debit_card,
            transactionId: randomUUID()
        });

        expect(() => payment.completePayment()).toThrow(`Payment cannot be completed in current status: ${payment.getStatus()}`)
    });

    it("should throw an error when fail payment", () => {
        const product = new Product({
            name: "television",
            description: "eletronic product",
            price: 1499.99,
            stock: 50
        });

        const order = new Order({
            customerId: randomUUID()
        });
        order.addProduct(product);

        const payment = new Payment({
            orderId: order.getId(),
            status: PaymentStatusEnum.completed,
            paymentMethod: PaymentMethodEnum.debit_card,
            transactionId: randomUUID()
        });

        expect(() => payment.failPayment()).toThrow(`Payment cannot be failed in current status: ${payment.getStatus()}`)
    });
})