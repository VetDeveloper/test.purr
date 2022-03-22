import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    // Зачем create оставил, если в authorization модуле есть регистрация?
    @ApiOperation({summary: 'Создание пользователя'})
    // вместо сущностей лучше возвращать объекты классов на основе этих сущностей
    // сейчас у тебя пусть и захешированный, но пароль возвращается (такую информацию лучше не показывать никому)
    // это ко всем контроллерам относится
    @ApiResponse({status: 201, type: User})
    @Post()
    create(@Body() userDto : CreateUserDTO) {
        return this.usersService.createUser(userDto);
    }


    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Получение одного пользователя'})
    @ApiResponse({status: 200, type: User})
    @ApiNotFoundResponse({description: "Not found."})
    @Get('/:id')
    getOneUser(@Param('id') id : number) {
        return this.usersService.getOneUser(id)
    }

    // тут тоже нет гардов
    @ApiOperation({summary: 'Обновление пользователя'})
    @ApiResponse({status: 200, type: User})
    @ApiNotFoundResponse({description: "Not found."})
    @Patch('/:id')
    updateUser(@Param('id') id : number, @Body() userDto : UpdateUserDTO) {
        return this.usersService.updateUser(id, userDto);
    }

    // тут тоже нет гардов
    @ApiOperation({summary: 'Удаление пользователя'})
    @ApiResponse({status: 200, type: User})
    @ApiNotFoundResponse({description: "Not found."})
    @Delete('/:id')
    deleteUser(@Param('id') id : number) {
        return this.usersService.deleteUser(id);
    }

}
