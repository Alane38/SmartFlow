import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FacturesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
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

  async findOne(id: string) {
    return this.prisma.facture.findUnique({
      where: { id },
      include: {
        client: true,
        devis: true,
        lignes: true,
        paiements: true,
      },
    });
  }

  async create(data: any) {
    return this.prisma.facture.create({
      data,
      include: {
        client: true,
        devis: true,
        lignes: true,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.facture.update({
      where: { id },
      data,
      include: {
        client: true,
        devis: true,
        lignes: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.facture.delete({
      where: { id },
    });
  }
}