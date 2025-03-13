import { InputCreateProductDto } from "../../../../dtos/create.product.dto";
import { CreateProductUsecase } from "../../../product/create.product.use-case";

const MockRepository = () => {
    return {
        create: jest.fn(),
        filter: jest.fn(),
        getByid: jest.fn()
    }
}

describe("Unit test create product use case", () => {
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
});