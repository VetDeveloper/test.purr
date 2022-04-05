import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateCardDTO } from './create-card.dto';

export class ResponseCardDTO {
  constructor({ name, description, tag }: CreateCardDTO) {
    this.name = name;
    this.description = description;
    this.tag = tag;
  }

  @ApiProperty({ example: 'Пропылесосить', description: 'Название' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @ApiProperty({
    example:
      'Взять полесос в комнате у брата. Подключить в переноску из родительской комнаты.',
    description: 'Описание',
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  description?: string;

  @ApiProperty({ example: 'Выполнено', description: 'Пометка' })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  tag?: string;
}
