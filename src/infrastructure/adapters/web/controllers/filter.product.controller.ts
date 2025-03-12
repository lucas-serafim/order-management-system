import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { FilterProductUsecase } from "../../../../application/use-case/filter.product.use-case";
import { FilterProductDto } from "../dtos/filter.product.dto";
import { OutputFilterProductDto } from "../../../../application/dtos/filter.product.dto";

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