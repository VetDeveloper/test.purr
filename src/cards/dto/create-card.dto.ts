import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCardDTO {
    
    @ApiProperty({example: 'Пропылесосить', description: 'Название'})
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    readonly name: string;

    @ApiProperty({example: 'Взять полесос в комнате у брата. Подключить в переноску из родительской комнаты.', description: 'Описание'})
    @IsString()
    @IsOptional()
    @MaxLength(100)
    readonly description?: string;

    @ApiProperty({example: 'Выполнено', description: 'Пометка'})
    @IsString()
    @IsOptional()
    @MaxLength(20)
    readonly tag?: string;
}