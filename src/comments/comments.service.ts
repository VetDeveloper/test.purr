import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/cards/cards.entity';
import { CardsService } from 'src/cards/cards.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Commentary } from './comments.entity';
import { CreateCommentaryDTO } from './dto/create-commentary.dto';
import { UpdateCommentaryDTO } from './dto/update-commentary.dto';

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(Commentary) private commentsRepository: Repository<Commentary>,
        private cardsService : CardsService,
        private usersService : UsersService
        ) {}

    async createCommentaty(user_id : number, card_id : number, dto : CreateCommentaryDTO) : Promise<Commentary> {
        await this.usersService.getOneUser(user_id);
        const commentary = this.commentsRepository.create({
            userId : user_id,
            cardId : card_id,
            ...dto
        })
        this.commentsRepository.save(commentary); // результат работы сейв: сохраненная сущность, лучше его возвращать
        return commentary;
    }

    async getAllComments(user_id : number, column_id : number, card_id : number) : Promise<Commentary[]> {
        const comments = await this.commentsRepository.find({where:{userId : user_id, cardId : card_id}});
        await this.cardsService.getOneCard(user_id, column_id, card_id);
        if (!comments) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return comments;
    }

    async getOneCommentaty(user_id : number, column_id : number, card_id : number, id : number) : Promise<Commentary> {
        const commentary = await this.commentsRepository.findOne({where:{userId : user_id, cardId : card_id, id: id}});
        await this.cardsService.getOneCard(user_id, column_id, card_id);
        if (!commentary) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return commentary;
    }

    async updateCommentary(user_id : number, column_id : number, card_id : number, id : number, dto: UpdateCommentaryDTO) : Promise<Commentary> {
        const commentary = await this.getOneCommentaty(user_id, column_id, card_id, id);
        return await this.commentsRepository.save(
            {
                ...commentary,
                ...dto
            })
    }

    async deleteCommentary(user_id : number, column_id : number, card_id : number, id : number) {
        const commentary = await this.getOneCommentaty(user_id, column_id, card_id, id)
        return await this.commentsRepository.remove(commentary);
    }
}