import { PartialType } from '@nestjs/swagger';
import { CreateParametresDto } from './create-parametres.dto';

export class UpdateParametresDto extends PartialType(CreateParametresDto) {}
