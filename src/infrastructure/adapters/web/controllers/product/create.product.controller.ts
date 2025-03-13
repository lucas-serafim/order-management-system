import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreateProductDto } from "../../dtos/product/create.product.dto";
import { CreateProductUsecase } from "../../../../../application/use-case/product/create.product.use-case";
import { OutputCreateProductDto } from "../../../../../application/dtos/product/create.product.dto";

@Controller("products")
export class CreateProductController {

    constructor(
        private readonly createProductUsecase: CreateProductUsecase
    ) { };

    @Post()
    @HttpCode(201)
    async create(@Body() params: CreateProductDto): Promise<OutputCreateProductDto> {
        return await this.createProductUsecase.execute(params);
    }
}   