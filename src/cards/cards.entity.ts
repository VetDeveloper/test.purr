import { ApiProperty } from "@nestjs/swagger";
import { Colum } from "src/columns/columns.entity";
import { Commentary } from "src/comments/comments.entity";
import { User } from "src/users/users.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Card {
    @ApiProperty({example: '1', description: 'Идентификационный номер'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: '1', description: 'Идентификационный номер пользователя, создавшего карточку'})
    @Column({ type: "int" })
    userId: number;

    @ApiProperty({example: '1', description: 'Идентификационный номер колонки, в которой расположена карточка'})
    @Column({ type: "int" })
    columnId: number;

    @ApiProperty({example: 'Пропылесосить', description: 'Название'})
    @Column({
        type: "varchar",
        length: 20
    })
    name: string;

    @ApiProperty({example: 'Взять полесос в комнате у брата. Подключить в переноску из родительской комнаты.', description: 'Описание'})
    @Column({
        type: "varchar",
        length: 100,
        nullable: true
    })
    description: string;

    @ApiProperty({example: 'Выполнено', description: 'Пометка'})
    @Column({
        type: "varchar",
        length: 20,
        nullable: true
    })
    tag: string;
    
    @ApiProperty({example: '2022-03-12 02:14:08.956309', description: 'Дата создания карточки'})
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @ApiProperty({example: '2022-03-12 02:14:08.956309', description: 'Дата обновления карточки'})
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;


    @OneToMany(() => Commentary, commentary => commentary.cardId)
    comments: Commentary[];

    @ManyToOne(() => User, user => user.id)
    user: User;

    @ManyToOne(() => Colum, column => column.id)
    column: Colum;

}