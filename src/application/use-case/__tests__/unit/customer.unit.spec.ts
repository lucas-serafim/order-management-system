import { CreateCustomerUsecase } from "../../customer/create.customer.use-case";

const MockRepository = () => {
    return {
        create: jest.fn(),
        getById: jest.fn()
    }
}

describe("Unit test customer use cases", () => {
    const customerRepository = MockRepository();

    it("should create a customer", async () => {
        const createCustomerUsecase = new CreateCustomerUsecase(customerRepository);

        const input = {
            name: "joao",
            email: "joao@joao.com",
            phone: "1199999999",
            address: "rua do joao numero 110"
        }

        const output = await createCustomerUsecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            email: input.email,
            phone: input.phone,
            address: input.address
        })
    });
}); 