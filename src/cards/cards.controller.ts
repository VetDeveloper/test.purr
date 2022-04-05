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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserOwnerGuard } from 'src/auth/guards/userOwner.guard';
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
  @UseGuards(JwtAuthGuard, UserOwnerGuard)
  @Post()
  async create(
    @Param('user_id') user_id: number,
    @Param('column_id') column_id: number,
    @Body() cardsDto: CreateCardDTO,
  ): Promise<ResponseCardDTO> {
    return new ResponseCardDTO(
      await this.cardsService.createCard(user_id, column_id, cardsDto),
    );
  }

  @ApiOperation({
    summary: 'Получение всех карточек пользователя в определенной колонке',
  })
  @ApiResponse({ status: 200, type: [ResponseCardDTO] })
  @Get()
  async getAllCards(
    @Param('user_id') user_id: number,
    @Param('column_id') column_id: number,
  ): Promise<ResponseCardDTO[]> {
    return (await this.cardsService.getAllCards(user_id, column_id)).map(
      (card) => new ResponseCardDTO(card),
    );
  }

  @ApiOperation({
    summary: 'Получение одной карточки пользователя в определенной колонке',
  })
  @ApiResponse({ status: 200, type: ResponseCardDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @Get('/:id')
  async getOneCard(
    @Param('user_id') user_id: number,
    @Param('column_id') column_id: number,
    @Param('id') id: number,
  ): Promise<ResponseCardDTO> {
    return new ResponseCardDTO(
      await this.cardsService.getOneCard(user_id, column_id, id),
    );
  }

  @ApiOperation({
    summary: 'Обновление одной карточки пользователя в определенной колонке',
  })
  @ApiResponse({ status: 200, type: ResponseCardDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, UserOwnerGuard)
  @Patch('/:id')
  async updateCard(
    @Param('user_id') user_id: number,
    @Param('column_id') column_id: number,
    @Param('id') id: number,
    @Body() cardDto: UpdateCardDTO,
  ): Promise<ResponseCardDTO> {
    return new ResponseCardDTO(
      await this.cardsService.updateCard(user_id, column_id, id, cardDto),
    );
  }

  @ApiOperation({
    summary: 'Удаление одной карточки пользователя в определенной колонке',
  })
  @ApiResponse({ status: 200, type: ResponseCardDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, UserOwnerGuard)
  @Delete('/:id')
  async deleteCard(
    @Param('user_id') user_id: number,
    @Param('column_id') column_id: number,
    @Param('id') id: number,
  ): Promise<ResponseCardDTO> {
    return new ResponseCardDTO(
      await this.cardsService.deleteCard(user_id, column_id, id),
    );
  }
}
