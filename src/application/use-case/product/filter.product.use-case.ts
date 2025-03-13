import { Product } from "../../../domain/entities/product.entity";
import { ProductRepositoryPort } from "../../../domain/ports/product.port";
import { InputFilterProductDto, OutputFilterProductDto } from "../../dtos/product/filter.product.dto";

export class FilterProductUsecase {
    
    constructor(
        private readonly productRepository: ProductRepositoryPort
    ) { };

    async execute(params: InputFilterProductDto): Promise<OutputFilterProductDto> {
        return await this.productRepository.filter(params);
    }
}