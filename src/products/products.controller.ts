import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduct() {
    return 'This action adds a new product';
  }
  @Get()
  findAllProducts() {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      {}
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a product ${id}`;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `This action removes a product ${id}`;
  }

  @Patch(':id')
  updateProduct(@Body() updateProductDto: any, @Param('id') id: string) {
    return `This action updates a product ${+id}`;
  }
}
