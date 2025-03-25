import { Repository } from "typeorm";
import { Customer } from "../../../../domain/entities/customer.entity";
import { CustomerRepositoryPort } from "../../../../domain/ports/customer.port";
import { CustomerEntity } from "../entities/customer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";
import { CustomerMapper } from "../mappers/customer.mapper";

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

    async getById(customerId: string): Promise<Customer> {
        const response = await this.repository.findOne({
            where: {
                id: customerId
            }
        });

        if (!response)
            throw new NotFoundException(`Customer not found. Customer id: ${customerId}`);

        return CustomerMapper.toDomain(response);
    }

    async update(customer: Customer): Promise<void> {
        const updateData = {
            name: customer.getName(),
            email: customer.getEmail(),
            phone: customer.getPhone(),
            address: customer.getAddress()
        }

        await this.repository.update({
            id: customer.getId()
        }, updateData);
    }
}