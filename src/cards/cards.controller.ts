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
import { Card } from './cards.entity';
import { CardsService } from './cards.service';
import { CreateCardDTO } from './dto/create-card.dto';
import { ResponseCardDTO } from './dto/response-card.dto';
import { UpdateCardDTO } from './dto/update-card.dto';

@ApiTags('Карточки')
@Controller('users/:user_id/columns/:column_id/cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @ApiOperation({
    summary: 'Создание карточки пользователя в определенной колонки',
  })
  @ApiResponse({ status: 201, type: ResponseCardDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiBearerAuth()
  @UseGuards(OwnerGuard)
  @Post()
  create(
    @Param('user_id') user_id: number,
    @Param('column_id') column_id: number,
    @Body() cardsDto: CreateCardDTO,
  ): Promise<ResponseCardDTO> {
    return this.cardsService.createCard(user_id, column_id, cardsDto);
  }

  @ApiOperation({
    summary: 'Получение всех карточек пользователя в определенной колонке',
  })
  @ApiResponse({ status: 200, type: [ResponseCardDTO] })
  @Get()
  getAllCards(
    @Param('user_id') user_id: number,
    @Param('column_id') column_id: number,
  ): Promise<ResponseCardDTO[]> {
    return this.cardsService.getAllCards(user_id, column_id);
  }

  @ApiOperation({
    summary: 'Получение одной карточки пользователя в определенной колонке',
  })
  @ApiResponse({ status: 200, type: ResponseCardDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @Get('/:id')
  getOneCard(
    @Param('user_id') user_id: number,
    @Param('column_id') column_id: number,
    @Param('id') id: number,
  ): Promise<ResponseCardDTO> {
    return this.cardsService.getOneCard(user_id, column_id, id);
  }

  @ApiOperation({
    summary: 'Обновление одной карточки пользователя в определенной колонке',
  })
  @ApiResponse({ status: 200, type: ResponseCardDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBearerAuth()
  @UseGuards(OwnerGuard)
  @Patch('/:id')
  updateCard(
    @Param('user_id') user_id: number,
    @Param('column_id') column_id: number,
    @Param('id') id: number,
    @Body() cardDto: UpdateCardDTO,
  ): Promise<ResponseCardDTO> {
    return this.cardsService.updateCard(user_id, column_id, id, cardDto);
  }

  @ApiOperation({
    summary: 'Удаление одной карточки пользователя в определенной колонке',
  })
  @ApiResponse({ status: 200, type: ResponseCardDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBearerAuth()
  @UseGuards(OwnerGuard)
  @Delete('/:id')
  deleteCard(
    @Param('user_id') user_id: number,
    @Param('column_id') column_id: number,
    @Param('id') id: number,
  ): Promise<ResponseCardDTO> {
    return this.cardsService.deleteCard(user_id, column_id, id);
  }
}
