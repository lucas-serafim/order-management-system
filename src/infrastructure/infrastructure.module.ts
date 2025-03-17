import { Module } from "@nestjs/common";
import { CreateProductController } from "./adapters/web/controllers/product/create.product.controller";
import { ProductRepository } from "./adapters/database/repositories/product.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./adapters/database/entities/product.entity";
import { databaseConfig } from "./adapters/database/database.config";
import { CreateProductUsecase } from "../application/use-case/product/create.product.use-case";
import { FilterProductController } from "./adapters/web/controllers/product/filter.product.controller";
import { FilterProductUsecase } from "../application/use-case/product/filter.product.use-case";
import { CreateOrderController } from "./adapters/web/controllers/order/create.order.controller";
import { OrderEntity } from "./adapters/database/entities/order.entity";
import { OrderRepository } from "./adapters/database/repositories/order.repository";
import { CreateOrderUsecase } from "../application/use-case/order/create.order.use-case";
import { CreateCustomerController } from "./adapters/web/controllers/customer/create.customer.controller";
import { CustomerRepository } from "./adapters/database/repositories/customer.repository";
import { CreateCustomerUsecase } from "../application/use-case/customer/create.customer.use-case";
import { CustomerEntity } from "./adapters/database/entities/customer.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),
        TypeOrmModule.forFeature([
            ProductEntity,
            OrderEntity,
            CustomerEntity
        ])
    ],
    controllers: [
        CreateProductController,
        FilterProductController,

        CreateOrderController,

        CreateCustomerController
    ],
    providers: [
        ProductRepository,
        OrderRepository,
        CustomerRepository,

        {
            provide: CreateProductUsecase,
            useFactory: (repository: ProductRepository) => new CreateProductUsecase(repository),
            inject: [ProductRepository]
        },
        {
            provide: FilterProductUsecase,
            useFactory: (repository: ProductRepository) => new FilterProductUsecase(repository),
            inject: [ProductRepository]
        },

        {
            provide: CreateOrderUsecase,
            useFactory: (orderRepository: OrderRepository, productRepository: ProductRepository, customerRepository: CustomerRepository) => {
                return new CreateOrderUsecase(orderRepository, productRepository, customerRepository)
            },
            inject: [OrderRepository, ProductRepository, CustomerRepository]
        },

        {
            provide: CreateCustomerUsecase,
            useFactory: (repository: CustomerRepository) => new CreateCustomerUsecase(repository),
            inject: [CustomerRepository]
        }
    ]
})
export class InfrastructureModule { };