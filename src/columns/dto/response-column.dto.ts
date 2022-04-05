import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateColumnDTO } from './create-column.dto';

export class ResponseColumnDTO {
  constructor({ name, description }: CreateColumnDTO) {
    this.name = name;
    this.description = description;
  }

  @ApiProperty({ example: 'Отложенные дела', description: 'Название колонки' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'В этой колонке находятся карточки с отложенными делами',
    description: 'Описание',
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  description?: string;
}
