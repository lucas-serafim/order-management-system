import { Controller, Get, HttpCode, Param, ParseUUIDPipe } from "@nestjs/common";
import { GetByIdOrderUsecase } from "../../../../../application/use-case/order/get-by-id.order.use-case";
import { OutputGetByIdOrderDto } from "../../../../../application/dtos/order/get-by-id.order.dto";

@Controller("orders")
export class GetByIdOrderController {

    constructor(
        private readonly getByIdOrderUsecase: GetByIdOrderUsecase
    ) { };

    @Get("/:orderId")
    @HttpCode(200)
    async getById(@Param("orderId", new ParseUUIDPipe()) orderId: string): Promise<OutputGetByIdOrderDto> {
        return await this.getByIdOrderUsecase.execute(orderId)
    }
}