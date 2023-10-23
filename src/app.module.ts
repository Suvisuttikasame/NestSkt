import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'db/data-source';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOption), ItemsModule, UsersModule, AuthsModule],
})
export class AppModule {}
