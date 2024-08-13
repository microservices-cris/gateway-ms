import { IsEnum, IsNotEmpty } from "class-validator";
import { OrderStatusList, OrderStatus } from "../enum/order.enum";

export class UpdateOrderStatusDto {
    @IsNotEmpty()
    @IsEnum(OrderStatusList, { message: `Valid status are: ${OrderStatusList}` })
    status: OrderStatus;
}