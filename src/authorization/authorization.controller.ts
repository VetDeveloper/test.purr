import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';
import { AuthorizationService } from './authorization.service';

@ApiTags('Авторизация')
@Controller('authorization')
export class AuthorizationController {

    constructor(private authorizationService: AuthorizationService) {}

    @Post('/login')
    @ApiOperation({summary: 'Вход'})
    @ApiResponse({status: 200, type: String})
    @ApiBadRequestResponse({description : "Failed registration/login"})
    login(@Body() dto: LoginUserDTO) {
        return this.authorizationService.login(dto)
    }

    @Post('/registration')
    @ApiOperation({summary: 'Регистрация'})
    @ApiResponse({status: 200, type: String})
    @ApiBadRequestResponse({description : "Failed registration/login"})
    registration(@Body() dto: CreateUserDTO) {
        return this.authorizationService.registration(dto)
    }

}
