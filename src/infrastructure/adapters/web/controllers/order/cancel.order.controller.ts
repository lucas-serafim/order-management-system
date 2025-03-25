import { Controller, HttpCode, Param, ParseUUIDPipe, Patch } from "@nestjs/common";
import { OutputCancelOrderDto } from "../../../../../application/dtos/order/cancel.order.dto";
import { CancelOrderUsecase } from "../../../../../application/use-case/order/cancel.order.use-case";

@Controller("orders")
export class CancelOrderController {

    constructor(
        private readonly cancelOrderUsecase: CancelOrderUsecase
    ) { };

    @Patch("/:orderId")
    @HttpCode(200)
    async cancel(@Param("orderId", new ParseUUIDPipe()) orderId: string): Promise<OutputCancelOrderDto> {
        return await this.cancelOrderUsecase.execute(orderId);
    }
}