import { PickType } from '@nestjs/swagger';
import { CreateColumnDTO } from './create-column.dto';

export class ResponseColumnDTO extends PickType(CreateColumnDTO, [
  'name',
  'description',
]) {}
