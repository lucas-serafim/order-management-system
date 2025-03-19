import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { PaymentMethodEnum } from "../../../../../domain/enums/payment-method.enum";
import { Transform } from "class-transformer";

export class CreatePaymentDto {

    @IsUUID()
    @IsNotEmpty()
    orderId: string;

    @IsEnum(PaymentMethodEnum)
    @IsNotEmpty()
    @Transform(({ value }) => (String(value).toUpperCase()))
    paymentMethod: PaymentMethodEnum;
}