import { Customer } from "../entities/customer.entity";

export interface CustomerRepositoryPort {

    create(customer: Customer): Promise<void>;
}