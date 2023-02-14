import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/product.module';
import { OrdersModule } from './orders/orders.module';
import { dataSourceOption } from 'db/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOption),
    ProductsModule,
    OrdersModule,
  ]
})
export class AppModule {}
