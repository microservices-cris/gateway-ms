import { IsEnum, IsOptional, IsString } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";
import { stringify } from "querystring";

export class OrderStatusDto {

    @IsOptional()
    @IsEnum(OrderStatusList, { message: `Valid status are: ${OrderStatusList}` })
    status: OrderStatus;

  
}