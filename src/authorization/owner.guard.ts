import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { User } from "src/users/users.entity";

@Injectable()
export class OwnerGuard implements CanActivate {

    constructor(private jwtservice: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1]

            const user : User = this.jwtservice.verify(token);
            req.user = user;

            return user.id === parseInt(req.params.user_id)

        } catch (e) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
    
}