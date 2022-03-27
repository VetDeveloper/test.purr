import { ApiProperty } from '@nestjs/swagger';
import { Colum } from 'src/columns/columns.entity';
import { Commentary } from 'src/comments/comments.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  columnId: number;

  @Column({
    type: 'varchar',
    length: 20,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  tag: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @OneToMany(() => Commentary, (commentary) => commentary.card)
  comments: Commentary[];

  @ManyToOne(() => User, (user) => user.cards)
  user: User;

  @ManyToOne(() => Colum, (column) => column.cards)
  column: Colum;
}
