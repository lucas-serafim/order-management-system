import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    customerId: string;

    @IsArray()
    @IsNotEmpty()
    @Type(() => ItemsDto)
    @ValidateNested()
    items: Array<ItemsDto>;
}

class ItemsDto {

    @IsUUID()
    @IsNotEmpty()
    id: string
}