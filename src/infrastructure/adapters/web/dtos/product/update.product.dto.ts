import { Optional } from "@nestjs/common"
import { IsNumber, IsString } from "class-validator"

export class UpdateProductDto {

    @IsString()
    @Optional()
    name: string

    @IsString()
    @Optional()
    description: string

    @IsNumber()
    @Optional()
    price: number

    @IsNumber()
    @Optional()
    stock: number
}