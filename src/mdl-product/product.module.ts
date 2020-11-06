import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../models/product.schema';
import { SharedModule } from '../mdl-shared/shared.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema }
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule { }