import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commentary } from './comments.entity';
import { CardsModule } from 'src/cards/cards.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [
    TypeOrmModule.forFeature([Commentary]),
    CardsModule,
    UsersModule,
    AuthModule,
  ],
})
export class CommentsModule {}
