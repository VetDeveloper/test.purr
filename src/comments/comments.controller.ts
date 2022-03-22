import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OwnerGuard } from 'src/authorization/owner.guard';
import { Commentary } from './comments.entity';
import { CommentsService } from './comments.service';
import { CreateCommentaryDTO } from './dto/create-commentary.dto';
import { UpdateCommentaryDTO } from './dto/update-commentary.dto';

@ApiTags('Комментарии')
@Controller('users/:user_id/columns/:column_id/cards/:card_id/comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) {}

    @ApiOperation({summary: 'Создание комментария'})
    @ApiResponse({status: 201, type: Commentary})
    @ApiNotFoundResponse({description: "Not found."})
    @UseGuards(OwnerGuard)
    @Post()
    create(
        @Param('user_id') user_id : number,
        @Param('card_id') card_id : number,
        @Body() commentsDto : CreateCommentaryDTO
        ) {
        // опечатка
        return this.commentsService.createCommentaty(user_id, card_id, commentsDto);
    }

    @ApiOperation({summary: 'Получение всех комментариев пользователя под карточкой в определенной колонке'})
    @ApiResponse({status: 200, type: [Commentary]})
    @ApiNotFoundResponse({description: "Not found."})
    @Get()
    getAllComments(
        @Param('user_id') user_id : number,
        @Param('column_id') column_id : number,
        @Param('card_id') card_id : number
    ) {
        return this.commentsService.getAllComments(user_id, column_id, card_id);
    }

    @ApiOperation({summary: 'Получение одного комментария пользователя под карточкой в определенной колонке'})
    @ApiResponse({status: 200, type: Commentary})
    @ApiNotFoundResponse({description: "Not found."})
    @Get('/:id')
    getOneCommentaty(
        @Param('user_id') user_id : number,
        @Param('column_id') column_id : number,
        @Param('card_id') card_id : number,
        @Param('id') id : number) {
        return this.commentsService.getOneCommentaty(user_id, column_id, card_id, id);
    }

    @ApiOperation({summary: 'Обновление комментария пользователя под карточкой в определенной колонке'})
    @ApiResponse({status: 200, type: Commentary})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({description: "Not found."})
    @UseGuards(OwnerGuard)
    @Patch('/:id')
    updateCommentary(
        @Param('user_id') user_id : number,
        @Param('column_id') column_id : number,
        @Param('card_id') card_id : number,
        @Param('id') id : number,
        @Body() commentaryDto : UpdateCommentaryDTO) {
        return this.commentsService.updateCommentary(user_id, column_id, card_id, id, commentaryDto);
    }

    @ApiOperation({summary: 'Удаление комментария пользователя под карточкой в определенной колонке'})
    @ApiResponse({status: 200, type: Commentary})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({description: "Not found."})
    @UseGuards(OwnerGuard)
    @Delete('/:id')
    deleteColumn(
        @Param('user_id') user_id : number,
        @Param('column_id') column_id : number,
        @Param('card_id') card_id : number,
        @Param('id') id : number
    ) {
        return this.commentsService.deleteCommentary(user_id, column_id, card_id, id);
    }

}