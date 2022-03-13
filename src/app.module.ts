import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        TypeOrmModule.forRoot(), 
        UsersModule, 
        ColumnsModule, 
        CardsModule, 
        CommentsModule, 
        AuthorizationModule
    ]
})

export class AppModule {}