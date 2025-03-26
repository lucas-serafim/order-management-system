import { Product } from "../../../domain/entities/product.entity";
import { ProductRepositoryPort } from "../../../domain/ports/product.port";
import { InputUpdateProductDto, OutputUpdateProductDto } from "../../dtos/product/update.product.dto";

export class UpdateProductUsecase {
    constructor(
        private readonly productRepository: ProductRepositoryPort
    ) {};

    async execute(params: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const product = await this.productRepository.getById(params.id);

        const updateProduct = new Product({
            id: product.getId(),
            name: params.name ?? product.getName(),
            description: params.description ?? product.getDescription(),
            price: params.price ?? product.getPrice(),
            stock: params.stock ?? product.getStock()
        })

        await this.productRepository.update(updateProduct);

        return new OutputUpdateProductDto(updateProduct);
    }
}