import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE,} from 'src/config';
import { catchError } from 'rxjs';
import {
  CreateOrderDto,
  OrderPaginationDto,
  OrderStatusDto,
  UpdateOrderStatusDto,
} from './dto';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.client.send('findAllOrders', orderPaginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('findOneOrder', { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':status')
  findAllByStatus(
    @Param() statusDto: OrderStatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    //console.log(status) // { status: 'PENDING' }
    //console.log( paginationDto)// { limit: 10, page: 1 }

    return this.client
      .send('findAllOrders', {
        ...paginationDto,
        // ...statusDto,
        status: statusDto.status,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Patch(':id')
  // @UseGuards()
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,

    @Body() statusDto: UpdateOrderStatusDto,
  ) {
    return this.client
      .send('changeOrderStatus', {
        id,
        status: statusDto.status,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
