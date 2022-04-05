import { PickType } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

export class LoginUserDTO extends PickType(CreateUserDTO, [
  'email',
  'password',
] as const) {}
