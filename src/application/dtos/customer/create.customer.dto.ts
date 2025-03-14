import { Customer } from "../../../domain/entities/customer.entity";

export interface InputCreateCustomerDto {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export class OutputCreateCustomerDto {

    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;

    constructor(customer: Customer) {
        this.id = customer.getId();
        this.name = customer.getName();
        this.email = customer.getEmail();
        this.phone = customer.getPhone();
        this.address = customer.getAddress();
    };
};