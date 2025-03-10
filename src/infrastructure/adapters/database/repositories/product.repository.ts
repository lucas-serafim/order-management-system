import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductRepositoryPort } from "../../../../domain/ports/product.port";
import { Product } from "../../../../domain/entities/product.entity";

@Injectable()
export class ProductRepository implements ProductRepositoryPort {
    constructor(
        @InjectRepository(ProductEntity) private readonly repository: Repository<ProductEntity>
    ) { };

    async create(product: Product): Promise<Product> {
        try {
            const params = {
                id: product.getId(),
                name: product.getName(),
                description: product.getDescription(),
                price: product.getPrice(),
                stock: product.getStock()
            }

            await this.repository.save(params);
            
            return product;
        } catch (error) {
            throw error;
        }
    }
}