import { Customer } from "../../../../domain/entities/customer.entity";
import { CustomerEntity } from "../entities/customer.entity";

export class CustomerMapper {

    static toDomain(customer: CustomerEntity): Customer {
        return new Customer(customer);
    }
}