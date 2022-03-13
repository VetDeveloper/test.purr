import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCommentaryDTO {

    @ApiProperty({example: 'Просьба сделать быстрее', description: 'Содержание комментария'})
    @IsString()
    @IsNotEmpty()
    @MaxLength(300)
    readonly content: string;
}