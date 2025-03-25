import { Body, Controller, HttpCode, Param, ParseUUIDPipe, Put } from "@nestjs/common";
import { UpdateCustomerUsecase } from "../../../../../application/use-case/customer/update.customer.use-case";
import { UpdateCustomerDto } from "../../dtos/customer/update.customer.dto";
import { OutputUpdateCustomerDto } from "../../../../../application/dtos/customer/update.customer.dto";

@Controller("customers")
export class UpdateCustomerController {
    constructor(
        private readonly updateCustomerUsecase: UpdateCustomerUsecase
    ) {};

    @Put("/:customerId")
    @HttpCode(200)
    async update(
        @Param("customerId", new ParseUUIDPipe()) customerId: string,
        @Body() params: UpdateCustomerDto
    ): Promise<OutputUpdateCustomerDto> {
        return await this.updateCustomerUsecase.execute({ id: customerId, ...params })
    }
}