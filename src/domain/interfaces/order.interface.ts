import { Product } from "../entities/product.entity";

export interface OrderImpl {
    id?: string;
    customerId: string;
    items: Array<Product>;
}