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
import { Commentary } from './comments.entity';
import { CommentsService } from './comments.service';
import { CreateCommentaryDTO } from './dto/create-commentary.dto';
import { ResponseCommentatyDTO } from './dto/response-commentary.dto';
import { UpdateCommentaryDTO } from './dto/update-commentary.dto';

@ApiTags('Комментарии')
@Controller('users/:user_id/columns/:column_id/cards/:card_id/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Создание комментария' })
  @ApiResponse({ status: 201, type: ResponseCommentatyDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiBearerAuth()
  @UseGuards(OwnerGuard)
  @Post()
  async create(
    @Param('user_id') user_id: number,
    @Param('card_id') card_id: number,
    @Body() createCommentaryDTO: CreateCommentaryDTO,
  ): Promise<ResponseCommentatyDTO> {
    return new ResponseCommentatyDTO(
      await this.commentsService.createCommentaty(
        user_id,
        card_id,
        createCommentaryDTO,
      ),
    );
  }

  @ApiOperation({
    summary:
      'Получение всех комментариев пользователя под карточкой в определенной колонке',
  })
  @ApiResponse({ status: 200, type: [ResponseCommentatyDTO] })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @Get()
  async getAllComments(
    @Param('user_id') user_id: number,
    @Param('column_id') column_id: number,
    @Param('card_id') card_id: number,
  ): Promise<ResponseCommentatyDTO[]> {
    return (
      await this.commentsService.getAllComments(user_id, column_id, card_id)
    ).map((com) => new ResponseCommentatyDTO(com));
  }

  @ApiOperation({
    summary:
      'Получение одного комментария пользователя под карточкой в определенной колонке',
  })
  @ApiResponse({ status: 200, type: ResponseCommentatyDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @Get('/:id')
  async getOneCommentaty(
    @Param('user_id') user_id: number,
    @Param('column_id') column_id: number,
    @Param('card_id') card_id: number,
    @Param('id') id: number,
  ): Promise<ResponseCommentatyDTO> {
    return new ResponseCommentatyDTO(
      await this.commentsService.getOneCommentaty(
        user_id,
        column_id,
        card_id,
        id,
      ),
    );
  }

  @ApiOperation({
    summary:
      'Обновление комментария пользователя под карточкой в определенной колонке',
  })
  @ApiResponse({ status: 200, type: ResponseCommentatyDTO })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiBearerAuth()
  @UseGuards(OwnerGuard)
  @Patch('/:id')
  async updateCommentary(
    @Param('user_id') user_id: number,
    @Param('column_id') column_id: number,
    @Param('card_id') card_id: number,
    @Param('id') id: number,
    @Body() commentaryDto: UpdateCommentaryDTO,
  ): Promise<ResponseCommentatyDTO> {
    return new ResponseCommentatyDTO(
      await this.commentsService.updateCommentary(
        user_id,
        column_id,
        card_id,
        id,
        commentaryDto,
      ),
    );
  }

  @ApiOperation({
    summary:
      'Удаление комментария пользователя под карточкой в определенной колонке',
  })
  @ApiResponse({ status: 200, type: ResponseCommentatyDTO })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiBearerAuth()
  @UseGuards(OwnerGuard)
  @Delete('/:id')
  async deleteColumn(
    @Param('user_id') user_id: number,
    @Param('column_id') column_id: number,
    @Param('card_id') card_id: number,
    @Param('id') id: number,
  ): Promise<ResponseCommentatyDTO> {
    return new ResponseCommentatyDTO(
      await this.commentsService.deleteCommentary(
        user_id,
        column_id,
        card_id,
        id,
      ),
    );
  }
}
