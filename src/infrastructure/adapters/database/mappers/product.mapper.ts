import { Product } from "../../../../domain/entities/product.entity";
import { ProductEntity } from "../entities/product.entity";

export class ProductMapper {

    static toDomain(product: ProductEntity): Product {
        return new Product(product);
    }

    static toDomainList(products: ProductEntity[]): Product[] {
        return products.map(current => new Product(current));
    }
}