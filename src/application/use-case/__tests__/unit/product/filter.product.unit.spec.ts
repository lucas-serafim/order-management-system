import { Product } from "../../../../../domain/entities/product.entity";
import { InputFilterProductDto } from "../../../../dtos/filter.product.dto";
import { FilterProductUsecase } from "../../../product/filter.product.use-case";

const MockRepository = () => {
    return {
        create: jest.fn(),
        filter: jest.fn(),
        getByid: jest.fn()
    }
}

describe("Unit test product filter use case", () => {
    const productRepository = MockRepository(); 

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
        })
})