import { PartialType } from "@nestjs/swagger";
import { CreateCommentaryDTO } from "./create-commentary.dto";

export class UpdateCommentaryDTO  extends PartialType(CreateCommentaryDTO) {}