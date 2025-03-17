import { Customer } from "../../../../domain/entities/customer.entity";
import { Order } from "../../../../domain/entities/order.entity";
import { Product } from "../../../../domain/entities/product.entity";
import { PaymentMethodEnum } from "../../../../domain/enums/payment-method.enum";
import { CreatePaymentUsecase } from "../../payment/create.payment.use-case";

const MockRepository = () => {
    return {
        create: jest.fn()
    }
}

describe("Unit test payment use cases", () => {
    const paymentRepository = MockRepository();

    it("should create a payment", async () => {
        const createPaymentUsecase = new CreatePaymentUsecase(paymentRepository);

        const customer = new Customer({
            name: "joao",
            email: "joao@joao.com",
            phone: "1199999999",
            address: "rua do joao numero 110"
        });

        const product = new Product({
            name: "tv",
            description: "tv",
            price: 1500,
            stock: 12
        });

        const order = new Order({
            customerId: customer.getId(),
            items: [
                product
            ]
        })

        const input = {
            orderId: order.getId(),
            paymentMethod: PaymentMethodEnum.debit_card
        }

        const output = await createPaymentUsecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            orderId: input.orderId,
            status: "PENDING",
            paymentMethod: input.paymentMethod,
            transactionId: ""
        })
    });
});