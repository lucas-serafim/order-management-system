import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { OutputCreateCustomerDto } from "../../../../../application/dtos/customer/create.customer.dto";
import { CreateCustomerUsecase } from "../../../../../application/use-case/customer/create.customer.use-case";
import { CreateCustomerDto } from "../../dtos/customer/create.customer.dto";

@Controller("customers")
export class CreateCustomerController {

    constructor(
        private readonly createCustomerUsecase: CreateCustomerUsecase
    ) { }

    @Post()
    @HttpCode(201)
    async create(@Body() params: CreateCustomerDto): Promise<OutputCreateCustomerDto> {
        return await this.createCustomerUsecase.execute(params);
    }
}