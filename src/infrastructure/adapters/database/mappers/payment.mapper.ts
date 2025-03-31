import { Payment } from "../../../../domain/entities/payment.entity";
import { PaymentEntity } from "../entities/payment.entity";

export class PaymentMapper {

    static toDomain(paymentEntity: PaymentEntity): Payment {
        return new Payment(paymentEntity);
    }
}