import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateCommentaryDTO } from './create-commentary.dto';

export class ResponseCommentatyDTO {
  constructor({ content }: CreateCommentaryDTO) {
    this.content = content;
  }

  @ApiProperty({
    example: 'Просьба сделать быстрее',
    description: 'Содержание комментария',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  content: string;
}
