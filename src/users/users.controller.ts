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

    @ApiOperation({summary: 'Создание пользователя'})
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

    @ApiOperation({summary: 'Обновление пользователя'})
    @ApiResponse({status: 200, type: User})
    @ApiNotFoundResponse({description: "Not found."})
    @Patch('/:id')
    updateUser(@Param('id') id : number, @Body() userDto : UpdateUserDTO) {
        return this.usersService.updateUser(id, userDto);
    }

    @ApiOperation({summary: 'Удаление пользователя'})
    @ApiResponse({status: 200, type: User})
    @ApiNotFoundResponse({description: "Not found."})
    @Delete('/:id')
    deleteUser(@Param('id') id : number) {
        return this.usersService.deleteUser(id);
    }

}
