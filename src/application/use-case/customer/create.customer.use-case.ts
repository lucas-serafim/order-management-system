import { Customer } from "../../../domain/entities/customer.entity";
import { CustomerRepositoryPort } from "../../../domain/ports/customer.port";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "../../dtos/customer/create.customer.dto";

export class CreateCustomerUsecase {

    constructor(
        private readonly customerRepository: CustomerRepositoryPort
    ) { };

    async execute(params: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customer = new Customer(params);

        await this.customerRepository.create(customer);

        return new OutputCreateCustomerDto(customer);
    }
}