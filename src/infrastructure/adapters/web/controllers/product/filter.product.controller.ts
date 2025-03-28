import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { FilterProductUsecase } from "../../../../../application/use-case/product/filter.product.use-case";
import { FilterProductDto } from "../../dtos/product/filter.product.dto";
import { OutputFilterProductDto } from "../../../../../application/dtos/product/filter.product.dto";

@Controller("products")
export class FilterProductController {
    constructor(
        private readonly filterProductUsecase: FilterProductUsecase
    ) { };

    @Get()
    @HttpCode(200)
    async findAll(@Query() params: FilterProductDto): Promise<OutputFilterProductDto> {
        return await this.filterProductUsecase.execute(params);
    }
}