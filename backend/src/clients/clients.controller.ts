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
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau client' })
  @ApiResponse({
    status: 201,
    description: 'Le client a été créé avec succès.',
  })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les clients' })
  @ApiResponse({
    status: 200,
    description: 'Liste de tous les clients.',
  })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un client par ID' })
  @ApiParam({ name: 'id', description: 'ID du client' })
  @ApiResponse({
    status: 200,
    description: 'Client trouvé.',
  })
  @ApiResponse({ status: 404, description: 'Client non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un client' })
  @ApiParam({ name: 'id', description: 'ID du client' })
  @ApiResponse({
    status: 200,
    description: 'Le client a été mis à jour avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Client non trouvé.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer un client' })
  @ApiParam({ name: 'id', description: 'ID du client' })
  @ApiResponse({
    status: 204,
    description: 'Le client a été supprimé avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Client non trouvé.' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
