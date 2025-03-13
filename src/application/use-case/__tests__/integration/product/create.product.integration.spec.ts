import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { ProductEntity } from "../../../../../infrastructure/adapters/database/entities/product.entity";
import { ProductRepository } from "../../../../../infrastructure/adapters/database/repositories/product.repository";
import { CreateProductUsecase } from "../../../product/create.product.use-case";
import { InputCreateProductDto } from "../../../../dtos/create.product.dto";

describe("Integration test create product use case", () => {
    let createProductUsecase: CreateProductUsecase;
    let dataSource: DataSource;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: "postgres",
                    host: "localhost",
                    port: 5432,
                    username: "user",
                    password: "password",
                    database: "local",
                    entities: [ProductEntity],
                    synchronize: true
                }),
                TypeOrmModule.forFeature([ProductEntity])
            ],
            providers: [ProductRepository]
        }).compile();

        const productRepository = module.get<ProductRepository>(ProductRepository);
        createProductUsecase = new CreateProductUsecase(productRepository);
        dataSource = module.get<DataSource>(DataSource);
    });

    afterEach(async () => {
        await dataSource.query("DELETE FROM products WHERE name = 'integration test - creating a product'");
    });

    afterAll(async () => {
        await dataSource.destroy();
    });

    it("should create a product", async () => {
        const input: InputCreateProductDto = {
            name: "integration test - creating a product",
            description: "tv",
            price: 1500,
            stock: 12
        }

        const output = await createProductUsecase.execute(input);

        expect(output).toBeDefined();

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            description: input.description,
            price: input.price,
            stock: input.stock
        });

        const savedProduct = await dataSource.query(`SELECT * FROM products WHERE id = '${output.id}'`);

        expect(savedProduct.length).toBe(1);
        expect(savedProduct[0]).toEqual({
            id: output.id,
            name: output.name,
            description: output.description,
            price: output.price,
            stock: output.stock
        });
    });
})