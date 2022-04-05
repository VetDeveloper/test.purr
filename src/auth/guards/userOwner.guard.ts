import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserOwnerGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const logUserId = req.user.id;
    const userId = parseInt(req.params.user_id);

    let ownerId: Promise<User> = this.userService.getOneUser(userId);

    return ownerId.then((resp) => {
      return logUserId === resp.id;
    });
  }
}
