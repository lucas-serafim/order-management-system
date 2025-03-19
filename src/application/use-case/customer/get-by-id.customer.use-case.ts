import { CustomerRepositoryPort } from "../../../domain/ports/customer.port";
import { OutputGetByIdCustomerDto } from "../../dtos/customer/get-by-id.customer.dto";

export class GetByIdCustomerUsecase {
    constructor(
        private readonly customerRepository: CustomerRepositoryPort
    ) {}

    async execute(customerId: string): Promise<OutputGetByIdCustomerDto> {
        const customer = await this.customerRepository.getById(customerId);
        return new OutputGetByIdCustomerDto(customer);
    }
}