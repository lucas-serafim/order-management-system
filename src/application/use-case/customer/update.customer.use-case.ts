import { Customer } from "../../../domain/entities/customer.entity";
import { CustomerRepositoryPort } from "../../../domain/ports/customer.port";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "../../dtos/customer/update.customer.dto";

export class UpdateCustomerUsecase {
    constructor(
        private readonly customerRepository: CustomerRepositoryPort
    ) {};

    async execute(params: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        const customer = await this.customerRepository.getById(params.id);

        const updatedCustomer = new Customer({
            id: customer.getId(),
            name: params.name ?? customer.getName(),
            email: params.email ?? customer.getEmail(),
            address: params.address ?? customer.getAddress(),
            phone: params.phone ?? customer.getPhone()
        });

        await this.customerRepository.update(updatedCustomer);

        return new OutputUpdateCustomerDto(updatedCustomer);
    }
}