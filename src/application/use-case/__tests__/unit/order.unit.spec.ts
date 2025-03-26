import { Customer } from "../../../../domain/entities/customer.entity";
import { Order } from "../../../../domain/entities/order.entity";
import { Product } from "../../../../domain/entities/product.entity";
import { InputCreateOrderDto } from "../../../dtos/order/create.order.dto";
import { CancelOrderUsecase } from "../../order/cancel.order.use-case";
import { CreateOrderUsecase } from "../../order/create.order.use-case";
import { FilterOrderUsecase } from "../../order/filter.order.use-case";
import { GetByIdOrderUsecase } from "../../order/get-by-id.order.use-case";

const OrderMockRepository = () => {
    return {
        create: jest.fn(),
        getById: jest.fn(),
        cancel: jest.fn(),
        filter: jest.fn()
    }
}

const ProductMockRepository = () => {
    return {
        create: jest.fn(),
        filter: jest.fn(),
        getById: jest.fn()
    }
}

const CustomerMockRepository = () => {
    return {
        create: jest.fn(),
        getById: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test order use cases", () => {
    const orderRepository = OrderMockRepository();
    const productRepository = ProductMockRepository();
    const customerRepository = CustomerMockRepository();


    it("should create a order", async () => {
        const createOrderUsecase = new CreateOrderUsecase(orderRepository, productRepository, customerRepository);

        const customer = new Customer({
            name: "joao",
            email: "joao@joao.com",
            phone: "1199999999",
            address: "rua do joao numero 110"
        });

        customerRepository.getById.mockResolvedValue(customer);

        const product = new Product({
            name: "tv",
            description: "tv",
            price: 1500,
            stock: 12
        });

        productRepository.getById.mockResolvedValue(product);

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
        expect(output.items).toHaveLength(1);
        expect(output.status).toBe("PENDING");
    })

    it("should cancel a order", async () => {
        const cancelOrderUsecase = new CancelOrderUsecase(orderRepository);

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
            customerId: customer.getId()
        });
        order.addProduct(product);

        orderRepository.getById.mockResolvedValue(order);

        const output = await cancelOrderUsecase.execute(order.getId());

        expect(output.status).toBe("CANCELLED");
    });

    it("should throw an error when try to cancel a order", async () => {
        const cancelOrderUsecase = new CancelOrderUsecase(orderRepository);

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
            customerId: customer.getId()
        });

        order.addProduct(product);
        order.pay();
        order.ship();

        orderRepository.getById.mockResolvedValue(order);

        expect(async () => await cancelOrderUsecase.execute(order.getId())).rejects.toThrow("Only shipped or delivered orders cannot be cancelled")
    });

    it("should get order by id", async () => {
        const getByIdOrderUsecase = new GetByIdOrderUsecase(orderRepository);

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
            customerId: customer.getId()
        });
        order.addProduct(product);

        orderRepository.getById.mockResolvedValue(order);

        const output = await getByIdOrderUsecase.execute(order.getId());

        expect(output).toEqual({
            id: order.getId(),
            customerId: order.getCustomerId(),
            items: order.getItems(),
            totalAmount: order.getTotalAmount(),
            status: order.getStatus(),
            createdAt: order.getCreatedAt(),
            updatedAt: order.getUpdatedAt()
        });
    });

    it("should filter orders", async () => {
        const filterOrderUseCase = new FilterOrderUsecase(orderRepository);

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
            customerId: customer.getId()
        });
        order.addProduct(product);

        const order2 = new Order({
            customerId: customer.getId()
        });
        order.addProduct(product);

        const mockOrders: Order[] = [
            order,
            order2
        ];

        orderRepository.filter.mockResolvedValue([mockOrders, mockOrders.length]);

        let input = {
            currentPage: 1,
            pageSize: 2
        };

        let output = await filterOrderUseCase.execute(input);

        expect(orderRepository.filter).toHaveBeenCalledWith(input);
        expect(orderRepository.filter).toHaveBeenCalledTimes(1);

        expect(output).toEqual([mockOrders, mockOrders.length]);
    });

    it("should return a empty queue when there is no product", async () => {
        const filterOrderUseCase = new FilterOrderUsecase(orderRepository);

        orderRepository.filter.mockResolvedValue([[], 0]);

        let input = {
            currentPage: 1,
            pageSize: 2
        };

        let output = await filterOrderUseCase.execute(input);

        expect(orderRepository.filter).toHaveBeenCalledWith(input);

        expect(output).toEqual([[], 0]);
    })
});