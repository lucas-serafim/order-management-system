import { Product } from "../../../domain/entities/product.entity";
import { ProductRepositoryPort } from "../../../domain/ports/product.port";
import { InputCreateProductDto, OutputCreateProductDto } from "../../dtos/product/create.product.dto";


export class CreateProductUsecase {

    constructor(
        private readonly productRepository: ProductRepositoryPort
    ) { };

    async execute(params: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const product = new Product(params);

        await this.productRepository.create(product);

        return new OutputCreateProductDto(product);
    }
}