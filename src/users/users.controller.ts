import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OwnerGuard } from 'src/authorization/owner.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { ResponseUserDTO } from './dto/response-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [ResponseUserDTO] })
  @Get()
  getAllUsers(): Promise<ResponseUserDTO[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получение одного пользователя' })
  @ApiResponse({ status: 200, type: ResponseUserDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @Get('/:id')
  getOneUser(@Param('id') id: number): Promise<ResponseUserDTO> {
    return this.usersService.getOneUser(id);
  }

  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiResponse({ status: 200, type: ResponseUserDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiBearerAuth()
  @UseGuards(OwnerGuard)
  @Patch('/:id')
  updateUser(
    @Param('id') id: number,
    @Body() userDto: UpdateUserDTO,
  ): Promise<ResponseUserDTO> {
    return this.usersService.updateUser(id, userDto);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200, type: ResponseUserDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiBearerAuth()
  @UseGuards(OwnerGuard)
  @Delete('/:id')
  deleteUser(@Param('id') id: number): Promise<ResponseUserDTO> {
    return this.usersService.deleteUser(id);
  }
}
