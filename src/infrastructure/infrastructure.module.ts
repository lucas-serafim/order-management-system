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
import { CreatePaymentController } from "./adapters/web/controllers/payment/create.payment.controller";
import { PaymentRepository } from "./adapters/database/repositories/payment.repository";
import { CreatePaymentUsecase } from "../application/use-case/payment/create.payment.use-case";
import { PaymentEntity } from "./adapters/database/entities/payment.entity";
import { GetByIdCustomerController } from "./adapters/web/controllers/customer/get-by-id.customer.controller";
import { GetByIdCustomerUsecase } from "../application/use-case/customer/get-by-id.customer.use-case";
import { UpdateCustomerController } from "./adapters/web/controllers/customer/update.customer.controller";
import { UpdateCustomerUsecase } from "../application/use-case/customer/update.customer.use-case";
import { CancelOrderUsecase } from "../application/use-case/order/cancel.order.use-case";
import { CancelOrderController } from "./adapters/web/controllers/order/cancel.order.controller";
import { GetByIdOrderUsecase } from "../application/use-case/order/get-by-id.order.use-case";
import { GetByIdOrderController } from "./adapters/web/controllers/order/get-by-id.order.controller";
import { FilterOrderController } from "./adapters/web/controllers/order/filter.order.controller";
import { FilterOrderUsecase } from "../application/use-case/order/filter.order.use-case";
import { PaymentGatewayPort } from "../domain/ports/payment-gateway.port";
import { StripePaymentService } from "./adapters/stripe/services/payment.service";
import { UpdateProductController } from "./adapters/web/controllers/product/update.product.controller";
import { UpdateProductUsecase } from "../application/use-case/product/update.product.use-case";
import { ConfirmPaymentController } from "./adapters/web/controllers/payment/confirm.payment.controller";
import { ConfirmPaymentUsecase } from "../application/use-case/payment/confirm.payment.use-case";

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),
        TypeOrmModule.forFeature([
            ProductEntity,
            OrderEntity,
            CustomerEntity,
            PaymentEntity
        ])
    ],
    controllers: [
        CreateProductController,
        FilterProductController,
        UpdateProductController,

        CreateOrderController,
        CancelOrderController,
        GetByIdOrderController,
        FilterOrderController,

        CreateCustomerController,
        GetByIdCustomerController,
        UpdateCustomerController,

        CreatePaymentController,
        ConfirmPaymentController
    ],
    providers: [
        ProductRepository,
        OrderRepository,
        CustomerRepository,
        PaymentRepository,

        StripePaymentService,

        // Products
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
            provide: UpdateProductUsecase,
            useFactory: (repository: ProductRepository) => new UpdateProductUsecase(repository),
            inject: [ProductRepository]
        },

        // Orders
        {
            provide: CreateOrderUsecase,
            useFactory: (orderRepository: OrderRepository, productRepository: ProductRepository, customerRepository: CustomerRepository) => {
                return new CreateOrderUsecase(orderRepository, productRepository, customerRepository)
            },
            inject: [OrderRepository, ProductRepository, CustomerRepository]
        },
        {
            provide: CancelOrderUsecase,
            useFactory: (orderRepository: OrderRepository) => new CancelOrderUsecase(orderRepository),
            inject: [OrderRepository]
        },
        {
            provide: GetByIdOrderUsecase,
            useFactory: (orderRepository: OrderRepository) => new GetByIdOrderUsecase(orderRepository),
            inject: [OrderRepository]
        },
        {
            provide: FilterOrderUsecase,
            useFactory: (orderRepository: OrderRepository) => new FilterOrderUsecase(orderRepository),
            inject: [OrderRepository]
        },

        // Customers
        {
            provide: CreateCustomerUsecase,
            useFactory: (repository: CustomerRepository) => new CreateCustomerUsecase(repository),
            inject: [CustomerRepository]
        },
        {
            provide: GetByIdCustomerUsecase,
            useFactory: (repository: CustomerRepository) => new GetByIdCustomerUsecase(repository),
            inject: [CustomerRepository]
        },
        {
            provide: UpdateCustomerUsecase,
            useFactory: (repository: CustomerRepository) => new UpdateCustomerUsecase(repository),
            inject: [CustomerRepository]
        },


        // Payments
        {
            provide: CreatePaymentUsecase,
            useFactory: (paymentRepository: PaymentRepository, orderRepository: OrderRepository, paymentGateway: PaymentGatewayPort) => {
                return new CreatePaymentUsecase(paymentRepository, orderRepository, paymentGateway);
            },
            inject: [PaymentRepository, OrderRepository, StripePaymentService]
        },
        {
            provide: ConfirmPaymentUsecase,
            useFactory: (paymentRepository: PaymentRepository, paymentGateway: PaymentGatewayPort) => {
                return new ConfirmPaymentUsecase(paymentRepository, paymentGateway);
            },
            inject: [PaymentRepository, StripePaymentService]
        }
    ]
})
export class InfrastructureModule { };