import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.entity';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthorizationService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async login(userDto: LoginUserDTO) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDTO) {
        const isUserAlreadyExist = await this.userService.getUserByEmail(userDto.email);

        if (isUserAlreadyExist) {
            // не ошибка, но в Nest уже есть исключения под все коды ошибок, лучше используй их (читается лучше)
            // throw new BadRequestException()
            throw new HttpException('Пользователь с таким email УЖЕ существует', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = {id: user.id, email: user.email}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: LoginUserDTO) {
        const user = await this.userService.getUserByEmail(userDto.email);

        if (!user) {
            // вот, тут же использовал нестовую ошибку 😄
            // message, однако, лучше оставить дефолтным -- передать в эксепшн просто строку,
            // у тебя тогда будет общий текст ошибки -- Unauthorized
            // и дополнительно твое сообщение
            throw new UnauthorizedException({message: 'Некорректный емайл'})
        }

        const passwordEquals = await bcrypt.compare(userDto.password, user.password);

        // точки с запятой теряешь иногда, не ошибка, но просто не консистентно выходит
        if (!passwordEquals) {
            throw new UnauthorizedException({message: 'Некорректный пароль'})
        }

        return user;
    }
}
