import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";

export class FilterOrderDto {

    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => (value !== undefined ? Number(value) : 10))
    pageSize: number = 10;

    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => (value !== undefined ? Number(value) : 1))
    currentPage: number = 1;

    @IsOptional()
    @IsUUID()
    id?: string;

    @IsOptional()
    @IsUUID()
    customerId?: string;

    @IsOptional()
    @IsString()
    status?: string;
}