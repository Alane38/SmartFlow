import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('factures')
@Controller('factures')
export class FacturesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Get all factures' })
  @ApiResponse({ status: 200, description: 'List of all factures' })
  async getAllFactures() {
    return this.prisma.facture.findMany({
      include: {
        client: true,
        devis: true,
        lignes: true,
        paiements: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get facture by ID' })
  @ApiResponse({ status: 200, description: 'Facture found' })
  @ApiResponse({ status: 404, description: 'Facture not found' })
  async getFactureById(@Param('id') id: string) {
    const facture = await this.prisma.facture.findUnique({
      where: { id },
      include: {
        client: true,
        devis: true,
        lignes: true,
        paiements: true,
      },
    });

    if (!facture) {
      throw new NotFoundException('Facture not found');
    }

    return facture;
  }
}