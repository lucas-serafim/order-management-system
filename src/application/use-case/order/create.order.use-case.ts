import { BadRequestException } from "@nestjs/common";
import { Order } from "../../../domain/entities/order.entity";
import { Product } from "../../../domain/entities/product.entity";
import { OrderRepositoryPort } from "../../../domain/ports/order.port";
import { ProductRepositoryPort } from "../../../domain/ports/product.port";
import { InputCreateOrderDto, OutputCreateOrderDto } from "../../dtos/order/create.order.dto";
import { CustomerRepositoryPort } from "../../../domain/ports/customer.port";

export class CreateOrderUsecase {

    constructor(
        private readonly orderRepository: OrderRepositoryPort,
        private readonly productRepository: ProductRepositoryPort,
        private readonly customerRepository: CustomerRepositoryPort
    ) { };

    async execute(params: InputCreateOrderDto): Promise<OutputCreateOrderDto> {

        await this.customerRepository.getById(params.customerId);

        const products: Product[] = [];
        const errors: string[] = [];

        for (const item of params.items) {
            await this.productRepository.getById(item.id)
                .then((response) => products.push(response))
                .catch((error) => errors.push(error));
        }

        if (errors.length) throw new BadRequestException(errors);

        const orderParams = {
            customerId: params.customerId,
            items: products
        }

        const order = new Order(orderParams);

        await this.orderRepository.create(order);

        return new OutputCreateOrderDto(order);
    }
}