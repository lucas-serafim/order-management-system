import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { OutputFilterOrderDto } from "../../../../../application/dtos/order/filter.order.dto";
import { FilterOrderUsecase } from "../../../../../application/use-case/order/filter.order.use-case";
import { FilterOrderDto } from "../../dtos/order/filter.order.dto";

@Controller("orders")
export class FilterOrderController {
    constructor(
        private readonly filterOrderUsecase: FilterOrderUsecase
    ) { };

    @Get()
    @HttpCode(200)
    async filter(@Query() params: FilterOrderDto): Promise<OutputFilterOrderDto> {
        return await this.filterOrderUsecase.execute(params);
    }
}