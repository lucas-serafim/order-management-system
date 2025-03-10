import { randomUUID } from "node:crypto";

interface CustomerImpl {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export class Customer {

    private id: string;
    private name: string;
    private email: string;
    private phone: string;
    private address: string;

    constructor(params: CustomerImpl) {
        this.name = params.name;
        this.email = params.email;
        this.phone = params.phone;
        this.address = params.address;

        this.id = randomUUID();
    };
}