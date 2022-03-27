import { PickType } from '@nestjs/swagger';
import { CreateCommentaryDTO } from './create-commentary.dto';

export class ResponseCommentatyDTO extends PickType(CreateCommentaryDTO, [
  'content',
]) {}
