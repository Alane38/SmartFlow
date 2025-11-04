import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DevisService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.devis.findMany({
      include: {
        client: true,
        lignes: true,
        factures: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.devis.findUnique({
      where: { id },
      include: {
        client: true,
        lignes: true,
        factures: true,
      },
    });
  }

  async create(data: any) {
    return this.prisma.devis.create({
      data,
      include: {
        client: true,
        lignes: true,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.devis.update({
      where: { id },
      data,
      include: {
        client: true,
        lignes: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.devis.delete({
      where: { id },
    });
  }
}