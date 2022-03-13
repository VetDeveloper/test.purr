import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
  imports: [
    UsersModule,
    JwtModule.register({
        secret: 'SECRETKEY',
        signOptions: {
          expiresIn: '48h'
        }
      })
  ],
    exports: [
      JwtModule
    ]
})
export class AuthorizationModule {}
