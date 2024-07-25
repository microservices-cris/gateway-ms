import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/config';
import { catchError } from 'rxjs';

@Controller('orders')
export class OrdersController {

  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient:ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto).pipe(
      catchError((error) => { throw new RpcException(error); }),
    );
    
  }

  @Get()
  findAll() {
    return this.ordersClient.send('findAllOrders', {}).pipe(
      catchError((error) => { throw new RpcException(error); }),
    );
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.ordersClient.send('findOneOrder', { id }).pipe(
      catchError((error) => { throw new RpcException(error); }),
    );
  }

  
}
