import { InputCreateProductDto } from "../../../dtos/create.product.dto";
import { CreateProductUsecase } from "../../create.product.use-case";

const MockRepository = () => {
    return {
        create: jest.fn()
    }
}

describe("Unit test create product use case", () => {

    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUsecase(productRepository);

        const input: InputCreateProductDto = {
            name: "integration test - creating a product",
            description: "tv",
            price: 1500,
            stock: 12
        }

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            description: input.description,
            price: input.price,
            stock: input.stock
        });
    })
});