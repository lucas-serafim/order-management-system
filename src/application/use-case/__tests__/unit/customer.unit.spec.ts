import { Customer } from "../../../../domain/entities/customer.entity";
import { CreateCustomerUsecase } from "../../customer/create.customer.use-case";
import { GetByIdCustomerUsecase } from "../../customer/get-by-id.customer.use-case";
import { UpdateCustomerUsecase } from "../../customer/update.customer.use-case";

const MockRepository = () => {
    return {
        create: jest.fn(),
        getById: jest.fn(),
        update: jest.fn()
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

    it("should get a customer by id", async () => {
        const getByIdCustomerUsecase = new GetByIdCustomerUsecase(customerRepository);

        const customer = new Customer({
            name: "joao",
            email: "joao@joao.com",
            phone: "1199999999",
            address: "rua do joao numero 110"
        });

        customerRepository.getById.mockResolvedValue(customer);

        const output = await getByIdCustomerUsecase.execute(customer.getId());

        expect(output).toEqual({
            id: customer.getId(),
            name: customer.getName(),
            email: customer.getEmail(),
            phone: customer.getPhone(),
            address: customer.getAddress(),
        });
    });

    it("should update a customer", async () => {
        const createCustomerUsecase = new CreateCustomerUsecase(customerRepository);
        const updateCustomerUsecase = new UpdateCustomerUsecase(customerRepository);

        const inputCreateCustomer = {
            name: "joao",
            email: "joao@joao.com",
            phone: "1199999999",
            address: "rua do joao numero 110"
        }

        const outputCreateCustomer = await createCustomerUsecase.execute(inputCreateCustomer);

        customerRepository.getById.mockResolvedValue(new Customer(outputCreateCustomer));

        let inputUpdateCustomer: any = {
            id: outputCreateCustomer.id,
            name: "mario"
        };

        let outputUpdateCustomer = await updateCustomerUsecase.execute(inputUpdateCustomer);

        expect(outputUpdateCustomer.name).toBe("mario");

        inputUpdateCustomer = {
            id: outputCreateCustomer.id,
            email: "mario@mario.com"
        };

        outputUpdateCustomer = await updateCustomerUsecase.execute(inputUpdateCustomer);

        expect(outputUpdateCustomer.email).toBe("mario@mario.com");

        inputUpdateCustomer = {
            id: outputCreateCustomer.id,
            phone: "1199999933"
        };

        outputUpdateCustomer = await updateCustomerUsecase.execute(inputUpdateCustomer);

        expect(outputUpdateCustomer.phone).toBe("1199999933");


        inputUpdateCustomer = {
            id: outputCreateCustomer.id,
            address: "rua do mario numero 110"
        };

        outputUpdateCustomer = await updateCustomerUsecase.execute(inputUpdateCustomer);

        expect(outputUpdateCustomer.address).toBe("rua do mario numero 110");
        expect(customerRepository.update).toHaveBeenCalledTimes(4)
    });
}); 