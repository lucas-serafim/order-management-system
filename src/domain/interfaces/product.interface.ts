export interface ProductImpl {
    id?: string;
    name: string;
    description: string;
    price: number;
    stock: number;
}

export interface ProductFilterImpl {
    pageSize: number;
    currentPage: number;
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
}