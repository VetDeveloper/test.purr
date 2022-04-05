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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserOwnerGuard } from 'src/auth/guards/userOwner.guard';
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
  async getAllUsers(): Promise<ResponseUserDTO[]> {
    return (await this.usersService.getAllUsers()).map((user) => {
      return new ResponseUserDTO({ ...user });
    });
  }

  @ApiOperation({ summary: 'Получение одного пользователя' })
  @ApiResponse({ status: 200, type: ResponseUserDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @Get('/:user_id')
  async getOneUser(@Param('user_id') id: number): Promise<ResponseUserDTO> {
    return new ResponseUserDTO(await this.usersService.getOneUser(id));
  }

  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiResponse({ status: 200, type: ResponseUserDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, UserOwnerGuard)
  @Patch('/:user_id')
  async updateUser(
    @Param('user_id') id: number,
    @Body() userDto: UpdateUserDTO,
  ): Promise<ResponseUserDTO> {
    return new ResponseUserDTO(await this.usersService.updateUser(id, userDto));
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200, type: ResponseUserDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, UserOwnerGuard)
  @Delete('/:user_id')
  async deleteUser(@Param('user_id') id: number): Promise<ResponseUserDTO> {
    return new ResponseUserDTO(await this.usersService.deleteUser(id));
  }
}
