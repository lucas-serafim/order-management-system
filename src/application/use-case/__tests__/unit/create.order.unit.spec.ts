import { Customer } from "../../../../domain/entities/customer.entity";
import { Product } from "../../../../domain/entities/product.entity";
import { InputCreateOrderDto } from "../../../dtos/order/create.order.dto";
import { CreateOrderUsecase } from "../../order/create.order.use-case";

const OrderMockRepository = () => {
    return {
        create: jest.fn()
    }
}

const ProductMockRepository = () => {
    return {
        create: jest.fn(),
        filter: jest.fn(),
        getByid: jest.fn()
    }
}

describe("Unit test create order use case", () => {
    const orderRepository = OrderMockRepository();
    const productRepository = ProductMockRepository();

    it("should create a order", async () => {
        const createOrderUsecase = new CreateOrderUsecase(orderRepository, productRepository);
        
        const customer = new Customer({
            name: "joao",
            email: "joao@joao.com",
            phone: "1199999999",
            address: "rua do joao numero 110"
        })

        const product = new Product({
            name: "tv",
            description: "tv",
            price: 1500,
            stock: 12
        });

        productRepository.getByid.mockResolvedValue(product)

        // TODO: create a customer

        const input: InputCreateOrderDto = {
            customerId: customer.getId(),
            items: [
                {
                    id: product.getId()
                }
            ]
        };

        const output = await createOrderUsecase.execute(input);

        expect(output.customerId).toBe(input.customerId);
        expect(output.items).toHaveLength(1)
        expect(output.status).toBe("PENDING")
    })
});