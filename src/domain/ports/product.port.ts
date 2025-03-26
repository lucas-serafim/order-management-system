import { Product } from "../entities/product.entity";
import { PaginationImpl } from "../interfaces/pagination.interface";
import { ProductFilterImpl } from "../interfaces/product.interface";

export interface ProductRepositoryPort {
    
    create(product: Product): Promise<void>;

    filter(params: ProductFilterImpl): Promise<PaginationImpl>;

    getById(productId: string): Promise<Product>;

    update(product: Product): Promise<Product>;
}