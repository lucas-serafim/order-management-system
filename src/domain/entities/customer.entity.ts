import { randomUUID } from "node:crypto";
import { CustomerImpl } from "../interfaces/customer.interface";

export class Customer {

    private id: string;
    private name: string;
    private email: string;
    private phone: string;
    private address: string;

    constructor(params: CustomerImpl) {
        this.id = params.id ?? randomUUID();
        this.name = params.name;
        this.email = params.email;
        this.phone = params.phone;
        this.address = params.address;
    };

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getPhone() {
        return this.phone;
    }

    getAddress() {
        return this.address;
    }
}