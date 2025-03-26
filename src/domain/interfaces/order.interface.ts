export interface OrderImpl {
    id?: string;
    customerId: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface OrderFilterImpl {
    pageSize: number;
    currentPage: number;
    id?: string;
    customerId?: string;
    status?: string;
}