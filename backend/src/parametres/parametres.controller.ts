import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ParametresService } from './parametres.service';
import { CreateParametresDto } from './dto/create-parametres.dto';
import { UpdateParametresDto } from './dto/update-parametres.dto';

@ApiTags('parametres')
@Controller('parametres')
export class ParametresController {
  constructor(private readonly parametresService: ParametresService) {}

  @Post()
  @ApiOperation({ summary: 'Créer de nouveaux paramètres de configuration' })
  @ApiResponse({
    status: 201,
    description: 'Les paramètres ont été créés avec succès.',
  })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  create(@Body() createParametresDto: CreateParametresDto) {
    return this.parametresService.create(createParametresDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les paramètres' })
  @ApiResponse({
    status: 200,
    description: 'Liste de tous les paramètres.',
  })
  findAll() {
    return this.parametresService.findAll();
  }

  @Get('first')
  @ApiOperation({ summary: 'Récupérer les premiers paramètres configurés' })
  @ApiResponse({
    status: 200,
    description: 'Premiers paramètres trouvés.',
  })
  @ApiResponse({
    status: 404,
    description: 'Aucun paramètre configuré.',
  })
  findFirst() {
    return this.parametresService.findFirst();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer des paramètres par ID' })
  @ApiParam({ name: 'id', description: 'ID des paramètres' })
  @ApiResponse({
    status: 200,
    description: 'Paramètres trouvés.',
  })
  @ApiResponse({ status: 404, description: 'Paramètres non trouvés.' })
  findOne(@Param('id') id: string) {
    return this.parametresService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour des paramètres' })
  @ApiParam({ name: 'id', description: 'ID des paramètres' })
  @ApiResponse({
    status: 200,
    description: 'Les paramètres ont été mis à jour avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Paramètres non trouvés.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  update(
    @Param('id') id: string,
    @Body() updateParametresDto: UpdateParametresDto,
  ) {
    return this.parametresService.update(id, updateParametresDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer des paramètres' })
  @ApiParam({ name: 'id', description: 'ID des paramètres' })
  @ApiResponse({
    status: 204,
    description: 'Les paramètres ont été supprimés avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Paramètres non trouvés.' })
  remove(@Param('id') id: string) {
    return this.parametresService.remove(id);
  }
}
