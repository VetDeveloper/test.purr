import { ApiProperty } from "@nestjs/swagger";
import { Card } from "src/cards/cards.entity";
import { User } from "src/users/users.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Colum {

    @ApiProperty({example: '1', description: 'Идентификационный номер'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: '1', description: 'ИД пользователя, создавшего колонку'})
    @Column({ type: "int" })
    userId: number;

    @ApiProperty({example: 'Отложенные дела', description: 'Название колонки'})
    @Column({
        type: "varchar",
        length: 20
    })
    name: string;

    @ApiProperty(
        {example: 'В этой колонке находятся карточки с отложенными делами',
        description: 'Описание'}
     )
    @Column({
        type: "varchar",
        length: 100,
        nullable: true
    })
    description: string;

    @ApiProperty({example: '2022-03-12 02:14:08.956309', description: 'Дата создания колонки'})
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @ApiProperty({example: '2022-03-12 02:14:08.956309', description: 'Дата обновления колонки'})
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;


    // сущности не грузятся вместе с основной (т.е. юзер не загрузится в колонке)
    // нужно это учитывать
    // да и вообще неправильно указал связь, почитай доки тайпорма
    @ManyToOne(() => User, user => user.id)
    user: User;

    @OneToMany(() => Card, card => card.columnId)
    cards: Card[];
}