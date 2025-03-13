import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreateOrderUsecase } from "../../../../../application/use-case/order/create.order.use-case";
import { OutputCreateOrderDto } from "../../../../../application/dtos/order/order.dto";
import { CreateOrderDto } from "../../dtos/order/create.order.dto";

@Controller("orders")
export class CreateOrderController {

    constructor(
        private readonly createOrderUsecase: CreateOrderUsecase
    ) { };

    @Post()
    @HttpCode(201)
    async create(@Body() params: CreateOrderDto): Promise<OutputCreateOrderDto> {
        return await this.createOrderUsecase.execute(params);
    }
}