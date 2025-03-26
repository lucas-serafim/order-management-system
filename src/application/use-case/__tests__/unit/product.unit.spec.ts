import { Product } from "../../../../domain/entities/product.entity";
import { InputCreateProductDto } from "../../../dtos/product/create.product.dto";
import { InputFilterProductDto } from "../../../dtos/product/filter.product.dto";
import { CreateProductUsecase } from "../../product/create.product.use-case";
import { FilterProductUsecase } from "../../product/filter.product.use-case";
import { UpdateProductUsecase } from "../../product/update.product.use-case";

const MockRepository = () => {
    return {
        create: jest.fn(),
        filter: jest.fn(),
        getById: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test product use cases", () => {
    const productRepository = MockRepository();

    it("should create a product", async () => {
        const createProductUsecase = new CreateProductUsecase(productRepository);

        const input: InputCreateProductDto = {
            name: "integration test - creating a product",
            description: "tv",
            price: 1500,
            stock: 12
        }

        const output = await createProductUsecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            description: input.description,
            price: input.price,
            stock: input.stock
        });
    });

    it("should filter products", async () => {
        const filterProductUseCase = new FilterProductUsecase(productRepository);

        const mockProducts: Product[] = [
            new Product({ name: "tv", description: "tv", price: 1499, stock: 12 }),
            new Product({ name: "tv2", description: "tv2", price: 1599, stock: 10 })
        ];

        productRepository.filter.mockResolvedValue([mockProducts, mockProducts.length]);

        let input: InputFilterProductDto = {
            currentPage: 1,
            pageSize: 2
        };

        let output = await filterProductUseCase.execute(input);

        expect(productRepository.filter).toHaveBeenCalledWith(input);
        expect(productRepository.filter).toHaveBeenCalledTimes(1);

        expect(output).toEqual([mockProducts, mockProducts.length]);
    });

    it("should return a empty queue when there is no product", async () => {
        const filterProductUseCase = new FilterProductUsecase(productRepository);

        productRepository.filter.mockResolvedValue([[], 0]);

        let input: InputFilterProductDto = {
            currentPage: 1,
            pageSize: 2
        };

        let output = await filterProductUseCase.execute(input);

        expect(productRepository.filter).toHaveBeenCalledWith(input);

        expect(output).toEqual([[], 0]);
    });

    it("should update a product", async () => {
        const updateProductUsecase = new UpdateProductUsecase(productRepository);

        const product = new Product({
            name: "integration test - creating a product",
            description: "tv",
            price: 1500,
            stock: 12
        });

        productRepository.getById.mockResolvedValue(product);

        let input: any = {
            id: product.getId(),
            name: "integration test - creating a tv"
        };

        let output = await updateProductUsecase.execute(input);

        expect(output.name).toBe("integration test - creating a tv");

        input = {
            id: product.getId(),
            description: "tv diferente"
        };

        output = await updateProductUsecase.execute(input);

        expect(output.description).toBe("tv diferente");

        input = {
            id: product.getId(),
            price: 2000
        };

        output = await updateProductUsecase.execute(input);

        expect(output.price).toBe(2000);

        input = {
            id: product.getId(),
            stock: 5
        };

        output = await updateProductUsecase.execute(input);

        expect(output.stock).toBe(5);
    });
});