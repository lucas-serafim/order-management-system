import { Body, Controller, HttpCode, Param, ParseUUIDPipe, Patch, Query } from "@nestjs/common";
import { UpdateProductUsecase } from "../../../../../application/use-case/product/update.product.use-case";
import { OutputUpdateProductDto } from "../../../../../application/dtos/product/update.product.dto";
import { UpdateProductDto } from "../../dtos/product/update.product.dto";

@Controller("products")
export class UpdateProductController {

    constructor(
        private readonly updateProductUsecase: UpdateProductUsecase
    ) { };

    @Patch("/:productId")
    @HttpCode(200)
    async update(
        @Param("productId", new ParseUUIDPipe()) productId: string,
        @Body() params: UpdateProductDto
    ): Promise<OutputUpdateProductDto> {
        return await this.updateProductUsecase.execute({
            id: productId,
            ...params
        });
    }
}