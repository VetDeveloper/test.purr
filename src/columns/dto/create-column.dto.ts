import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateColumnDTO {

    // ограничения на длину не нужны
    @ApiProperty({example: 'Отложенные дела', description: 'Название колонки'})
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    readonly name: string;

    @ApiProperty(
        {example: 'В этой колонке находятся карточки с отложенными делами',
        description: 'Описание'}
     )
    @IsString()
    @IsOptional()
    @MaxLength(100)
    readonly description?: string;
}