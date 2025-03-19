import { Controller, Get, HttpCode, Param, ParseUUIDPipe } from "@nestjs/common";
import { GetByIdCustomerUsecase } from "../../../../../application/use-case/customer/get-by-id.customer.use-case";
import { OutputGetByIdCustomerDto } from "../../../../../application/dtos/customer/get-by-id.customer.dto";

@Controller("customers")
export class GetByIdCustomerController {
    constructor(
        private readonly getByIdCustomerUsecase: GetByIdCustomerUsecase
    ) { };

    @Get("/:customerId")
    @HttpCode(200)
    async create(@Param("customerId", new ParseUUIDPipe()) customerId: string): Promise<OutputGetByIdCustomerDto> {
        return await this.getByIdCustomerUsecase.execute(customerId);
    }
}