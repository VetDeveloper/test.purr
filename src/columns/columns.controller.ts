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
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OwnerGuard } from 'src/authorization/owner.guard';
import { Colum } from './columns.entity';
import { ColumnsService } from './columns.service';
import { CreateColumnDTO } from './dto/create-column.dto';
import { ResponseColumnDTO } from './dto/response-column.dto';
import { UpdateColumnDTO } from './dto/update-column.dto';

@ApiTags('Колонки')
@Controller('users/:user_id/columns')
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @ApiOperation({ summary: 'Создание колонки' })
  @ApiResponse({ status: 201, type: ResponseColumnDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiBearerAuth()
  @UseGuards(OwnerGuard)
  @Post()
  create(
    @Param('user_id') user_id: number,
    @Body() columnsDto: CreateColumnDTO,
  ): Promise<ResponseColumnDTO> {
    return this.columnsService.createColumn(user_id, columnsDto);
  }

  @ApiOperation({ summary: 'Получение всех колонок пользователя' })
  @ApiResponse({ status: 200, type: [ResponseColumnDTO] })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @Get()
  getAllColumns(
    @Param('user_id') user_id: number,
  ): Promise<ResponseColumnDTO[]> {
    return this.columnsService.getAllColumns(user_id);
  }

  @ApiOperation({ summary: 'Получение определенной колонки пользователя' })
  @ApiResponse({ status: 200, type: ResponseColumnDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @Get('/:id')
  getOneColumn(
    @Param('user_id') user_id: number,
    @Param('id') id: number,
  ): Promise<ResponseColumnDTO> {
    return this.columnsService.getOneColumn(id, user_id);
  }

  @ApiOperation({ summary: 'Обновление колонки пользователя' })
  @ApiResponse({ status: 200, type: ResponseColumnDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Patch('/:id')
  @ApiBearerAuth()
  @UseGuards(OwnerGuard)
  updateColumn(
    @Param('user_id') user_id: number,
    @Param('id') id: number,
    @Body() columnDto: UpdateColumnDTO,
  ): Promise<ResponseColumnDTO> {
    return this.columnsService.updateColumn(user_id, id, columnDto);
  }

  @ApiOperation({ summary: 'Удаление колонки пользователя' })
  @ApiResponse({ status: 200, type: ResponseColumnDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(OwnerGuard)
  deleteColumn(
    @Param('user_id') user_id: number,
    @Param('id') id: number,
  ): Promise<ResponseColumnDTO> {
    return this.columnsService.deleteColumn(user_id, id);
  }
}
