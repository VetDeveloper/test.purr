import { PickType } from '@nestjs/swagger';
import { CreateCardDTO } from './create-card.dto';

export class ResponseCardDTO extends PickType(CreateCardDTO, [
  'name',
  'description',
  'tag',
]) {}
