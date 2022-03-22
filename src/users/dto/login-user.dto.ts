import { ApiProperty, PickType } from "@nestjs/swagger";
import { CreateUserDTO } from "./create-user.dto";

// используешь только в авторизации, там и оставь
export class LoginUserDTO extends PickType(CreateUserDTO, ['email', 'password'] as const) {}