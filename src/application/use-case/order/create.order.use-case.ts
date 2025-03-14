import { BadRequestException } from "@nestjs/common";
import { Order } from "../../../domain/entities/order.entity";
import { Product } from "../../../domain/entities/product.entity";
import { OrderRepositoryPort } from "../../../domain/ports/order.port";
import { ProductRepositoryPort } from "../../../domain/ports/product.port";
import { InputCreateOrderDto, OutputCreateOrderDto } from "../../dtos/order/create.order.dto";

export class CreateOrderUsecase {

    constructor(
        private readonly orderRepository: OrderRepositoryPort,
        private readonly productRepository: ProductRepositoryPort
    ) { };

    async execute(params: InputCreateOrderDto): Promise<OutputCreateOrderDto> {

        const products: Product[] = [];
        const errors: string[] = [];

        for (const item of params.items) {
            await this.productRepository.getByid(item.id)
                .then((response) => products.push(response))
                .catch((error) => errors.push(error));
        }

        if (errors.length) throw new BadRequestException(errors)

        const orderParams = {
            customerId: params.customerId,
            items: products
        }

        const order = new Order(orderParams);

        await this.orderRepository.create(order);

        return new OutputCreateOrderDto(order);
    }
}