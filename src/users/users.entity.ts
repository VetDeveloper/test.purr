import { ApiProperty } from "@nestjs/swagger";
import { Card } from "src/cards/cards.entity";
import { Colum } from "src/columns/columns.entity";
import { Commentary } from "src/comments/comments.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class User {
    
    @ApiProperty({example: '1', description: 'Идентификационный номер'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Александр', description: 'Имя'})
    @Column({
        type: "varchar",
        length: 20
    })
    firstName: string;

    @ApiProperty({example: 'Михайлов', description: 'Фамилия'})
    @Column({
        type: "varchar",
        length: 20
    })
    lastName: string;

    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    @Column({
        type: "varchar",
        length: 35,
        unique: true
    })
    email: string;

    @ApiProperty({example: '123Adwr.', description: 'Пароль'})
    @Column({
        type: "varchar",
        length: 100
    })
    password: string;

    @ApiProperty({example: '2022-03-12 02:14:08.956309', description: 'Дата создания пользователя'})
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @ApiProperty({example: '2022-03-12 02:14:08.956309', description: 'Дата обновления пользователя'})
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;


    @OneToMany(() => Colum, column => column.userId)
    columns: Colum[];

    @OneToMany(() => Card, card => card.userId)
    cards: Card[];

    @OneToMany(() => Commentary, commentary => commentary.userId)
    comments: Card[];
}