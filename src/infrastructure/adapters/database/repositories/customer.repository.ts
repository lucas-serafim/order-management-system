import { Repository } from "typeorm";
import { Customer } from "../../../../domain/entities/customer.entity";
import { CustomerRepositoryPort } from "../../../../domain/ports/customer.port";
import { CustomerEntity } from "../entities/customer.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class CustomerRepository implements CustomerRepositoryPort {

    constructor(
        @InjectRepository(CustomerEntity) private readonly repository: Repository<CustomerEntity>
    ) { };

    async create(customer: Customer): Promise<void> {

        const input = {
            id: customer.getId(),
            name: customer.getName(),
            email: customer.getEmail(),
            phone: customer.getPhone(),
            address: customer.getAddress()
        }

        await this.repository.save(input);
    }
}