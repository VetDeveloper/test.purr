import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {

    // максимальная длина имейла 256 символов, не нужно ограничение
    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    @IsEmail()
    @MaxLength(35)
    readonly email : string;

    @ApiProperty({example: '123Adwr.', description: 'Пароль'})
    @Length(6, 100)
    @IsString()
    readonly password : string;

    // и здесь не нужно
    @ApiProperty({example: 'Александр', description: 'Имя'})
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    readonly firstName: string;

    @ApiProperty({example: 'Михайлов', description: 'Фамилия'})
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    readonly lastName: string;
}