import { Module } from "@nestjs/common";
import { CreateProductController } from "./adapters/web/controllers/create.product.controller";
import { ProductRepository } from "./adapters/database/repositories/product.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./adapters/database/entities/product.entity";
import { databaseConfig } from "./adapters/database/database.config";
import { CreateProductUsecase } from "../application/use-case/create.product.use-case";

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),
        TypeOrmModule.forFeature([ProductEntity])
    ],
    controllers: [
        CreateProductController
    ],
    providers: [
        ProductRepository,

        {
            provide: CreateProductUsecase,
            useFactory: (repository: ProductRepository) => new CreateProductUsecase(repository),
            inject: [ProductRepository]
        }
    ]
})
export class InfrastructureModule { };