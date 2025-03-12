import { OutputFilterProductDto } from "../../application/dtos/filter.product.dto";
import { Product } from "../entities/product.entity";
import { ProductFilterImpl } from "../interfaces/product.find-all.interface";

export interface ProductRepositoryPort {
    
    create(product: Product): Promise<void>;

    filter(params: ProductFilterImpl): Promise<OutputFilterProductDto>;
}