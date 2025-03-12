import { Product } from "../../../../domain/entities/product.entity";
import { ProductEntity } from "../entities/product.entity";

export class ProductMapper {

    static toDomainList(products: ProductEntity[]): Product[] {
        return products.map(current => new Product(current));
    }
}