import { Transform, Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class FilterProductDto {

    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => (value !== undefined ? Number(value) : 10))
    pageSize: number = 10;

    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => (value !== undefined ? Number(value) : 1))
    currentPage: number = 1;

    @IsOptional()
    @IsString()
    id?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    price?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    stock?: number;
}