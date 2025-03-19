import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductRepositoryPort } from "../../../../domain/ports/product.port";
import { Product } from "../../../../domain/entities/product.entity";
import { ProductMapper } from "../mappers/product.mapper";
import { OutputFilterProductDto } from "../../../../application/dtos/product/filter.product.dto";
import { ProductFilterImpl } from "../../../../domain/interfaces/product.interface";


export class ProductRepository implements ProductRepositoryPort {
    constructor(
        @InjectRepository(ProductEntity) private readonly repository: Repository<ProductEntity>
    ) { };

    async create(product: Product): Promise<void> {
        const input = ProductMapper.toOrmEntity(product)
        await this.repository.save(input);
    }

    async filter(params: ProductFilterImpl): Promise<OutputFilterProductDto> {
        const { currentPage, pageSize, ...rest } = params

        const [response, total] = await this.repository.findAndCount({
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
            where: rest
        });

        const products = ProductMapper.toDomainList(response);

        return {
            items: products,
            currentPage,
            pageSize,
            total
        };
    }

    async getById(productId: string): Promise<Product> {
        const response = await this.repository.findOne({
            where: {
                id: productId
            }
        });

        if (!response)
            throw new NotFoundException(`Product not found. Product id: ${productId}`)

        return ProductMapper.toDomain(response);
    }
}