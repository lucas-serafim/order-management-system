import { Customer } from "../entities/customer.entity";

export interface CustomerRepositoryPort {

    create(customer: Customer): Promise<void>;

    getById(customerId: string): Promise<Customer>;

    update(customer: Customer): Promise<Customer>;
}