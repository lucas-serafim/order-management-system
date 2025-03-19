import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreatePaymentDto } from "../../dtos/payment/create.payment.dto";
import { OutputCreatePaymentDto } from "../../../../../application/dtos/payment/create.payment.dto";
import { CreatePaymentUsecase } from "../../../../../application/use-case/payment/create.payment.use-case";

@Controller("payments")
export class CreatePaymentController {

    constructor(
        private readonly createPaymentUsecase: CreatePaymentUsecase
    ) {};

    @Post()
    @HttpCode(201)
    async create(@Body() params: CreatePaymentDto): Promise<OutputCreatePaymentDto> {
        return await this.createPaymentUsecase.execute(params);
    }
}