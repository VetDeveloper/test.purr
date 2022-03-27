import { PickType } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';

export class ResponseUserDTO extends PickType(CreateUserDTO, [
  'firstName',
  'lastName',
  'email',
]) {}
