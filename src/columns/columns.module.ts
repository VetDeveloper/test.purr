import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { UsersModule } from 'src/users/users.module';
import { ColumnsController } from './columns.controller';
import { Colum } from './columns.entity';
import { ColumnsService } from './columns.service';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService],
  imports: [
    TypeOrmModule.forFeature([Colum]),
    UsersModule,
    AuthorizationModule
  ]
})
export class ColumnsModule {}
