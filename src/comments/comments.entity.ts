import { ApiProperty } from "@nestjs/swagger";
import { Card } from "src/cards/cards.entity";
import { User } from "src/users/users.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";

@Entity()
export class Commentary {
    
    @ApiProperty({example: '1', description: 'Идентификационный номер'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: '1', description: 'Идентификационный номер пользователя, создавшего комментарий'})
    @Column({ type: "int" })
    userId: number;

    @ApiProperty({example: '1', description: 'Идентификационный номер карточки'})
    @Column({ type: "int" })
    cardId: number;

    @ApiProperty({example: 'Просьба сделать быстрее', description: 'Содержание комментария'})
    @Column({
        type: "varchar",
        length: 300
    })
    content: string;
    
    @ApiProperty({example: '2022-03-12 02:14:08.956309', description: 'Дата создания комментария'})
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @ApiProperty({example: '2022-03-12 02:14:08.956309', description: 'Дата обновления комментария'})
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;


    @ManyToOne(() => User, user => user.id)
    user: User;

    @ManyToOne(() => Card, card => card.id)
    card: Card;
}