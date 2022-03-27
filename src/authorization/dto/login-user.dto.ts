import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateUserDTO } from '../../users/dto/create-user.dto';

export class LoginUserDTO extends PickType(CreateUserDTO, [
  'email',
  'password',
] as const) {}
