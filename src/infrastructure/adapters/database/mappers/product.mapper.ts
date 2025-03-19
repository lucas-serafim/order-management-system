import { Product } from "../../../../domain/entities/product.entity";
import { ProductEntity } from "../entities/product.entity";

export class ProductMapper {

    static toDomain(product: ProductEntity): Product {
        return new Product(product);
    }

    static toOrmEntity(product: Product): ProductEntity {
        const productEntity = new ProductEntity();

        productEntity.id = product.getId();
        productEntity.name = product.getName();
        productEntity.description = product.getDescription();
        productEntity.price = product.getPrice();
        productEntity.stock = product.getStock();

        return productEntity;
    }

    static toDomainList(products: ProductEntity[]): Product[] {
        return products.map(current => new Product(current));
    }
}