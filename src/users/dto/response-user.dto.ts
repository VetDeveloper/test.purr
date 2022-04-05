import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResponseUserDTO {
  constructor({ email, firstName, lastName }) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Александр', description: 'Имя' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Михайлов', description: 'Фамилия' })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
