import { Controller, HttpCode, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { OutputConfirmPaymentDto } from "../../../../../application/dtos/payment/confirm.payment.dto";
import { ConfirmPaymentUsecase } from "../../../../../application/use-case/payment/confirm.payment.use-case";

@Controller("payments")
export class ConfirmPaymentController {

    constructor(
        private readonly confirmPaymentUsecase: ConfirmPaymentUsecase
    ) {};

    @Post("/:paymentId")
    @HttpCode(200)
    async confirm(@Param("paymentId", new ParseUUIDPipe()) paymentId: string): Promise<OutputConfirmPaymentDto> {
        return await this.confirmPaymentUsecase.execute(paymentId);
    }
}