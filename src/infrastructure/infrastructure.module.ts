import { Module } from "@nestjs/common";
import { CreateProductController } from "./adapters/web/controllers/create.product.controller";
import { ProductRepository } from "./adapters/database/repositories/product.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./adapters/database/entities/product.entity";
import { databaseConfig } from "./adapters/database/database.config";
import { CreateProductUsecase } from "../application/use-case/product/create.product.use-case";
import { FilterProductController } from "./adapters/web/controllers/filter.product.controller";
import { FilterProductUsecase } from "../application/use-case/product/filter.product.use-case";
import { CreateOrderController } from "./adapters/web/controllers/order/create.order.controller";
import { OrderEntity } from "./adapters/database/entities/order.entity";
import { OrderRepository } from "./adapters/database/repositories/order.repository";
import { CreateOrderUsecase } from "../application/use-case/order/create.order.use-case";

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),
        TypeOrmModule.forFeature([
            ProductEntity,
            OrderEntity
        ])
    ],
    controllers: [
        CreateProductController,
        FilterProductController,

        CreateOrderController
    ],
    providers: [
        ProductRepository,
        OrderRepository,

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
            useFactory: (orderRepository: OrderRepository, productRepository: ProductRepository) => {
                return new CreateOrderUsecase(orderRepository, productRepository)
            },
            inject: [OrderRepository, ProductRepository]
        }
    ]
})
export class InfrastructureModule { };