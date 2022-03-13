import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Card } from './cards.entity';
import { CreateCardDTO } from './dto/create-card.dto';
import { UpdateCardDTO } from './dto/update-card.dto';

@Injectable()
export class CardsService {
    
    constructor(@InjectRepository(Card) private cardsRepository: Repository<Card>,
                private usersRepository : UsersService
    ) {}

    async createCard(user_id : number, column_id : number, dto : CreateCardDTO) : Promise<Card> {
        await this.usersRepository.getOneUser(user_id);
        const column = this.cardsRepository.create(
            {
                userId : user_id,
                columnId: column_id,
                ...dto
            });
        this.cardsRepository.save(column);
        return column;
    }

    async getAllCards(user_id : number, column_id : number) : Promise<Card[]> {
        await this.usersRepository.getOneUser(user_id);
        const cards = await this.cardsRepository.find({ where: { userId : user_id, columnId : column_id } });
        return cards;
    }

    async getOneCard(user_id : number, column_id : number, id : number) : Promise<Card> {
        const card = await this.cardsRepository.findOne({ where: { userId : user_id, columnId : column_id, id : id } });

        if (!card) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        return card;
    }

    async updateCard(user_id : number, column_id : number, id: number, dto: UpdateCardDTO) : Promise<Card> {
        const column = await this.getOneCard(user_id, column_id, id);
        return await this.cardsRepository.save(
            {
                ...column,
                ...dto
            })
    }

    async deleteCard(user_id : number, column_id : number, id: number) {
        const card = await this.getOneCard(user_id, column_id, id)
        return await this.cardsRepository.remove(card);
    }
}