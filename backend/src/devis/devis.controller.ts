import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('devis')
@Controller('devis')
export class DevisController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Get all devis' })
  @ApiResponse({ status: 200, description: 'List of all devis' })
  async getAllDevis() {
    return this.prisma.devis.findMany({
      include: {
        client: true,
        lignes: true,
        factures: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get devis by ID' })
  @ApiResponse({ status: 200, description: 'Devis found' })
  @ApiResponse({ status: 404, description: 'Devis not found' })
  async getDevisById(@Param('id') id: string) {
    const devis = await this.prisma.devis.findUnique({
      where: { id },
      include: {
        client: true,
        lignes: true,
        factures: true,
      },
    });

    if (!devis) {
      throw new NotFoundException('Devis not found');
    }

    return devis;
  }
}