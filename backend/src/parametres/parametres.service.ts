import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParametresDto } from './dto/create-parametres.dto';
import { UpdateParametresDto } from './dto/update-parametres.dto';

@Injectable()
export class ParametresService {
  constructor(private prisma: PrismaService) {}

  async create(createParametresDto: CreateParametresDto) {
    return this.prisma.parametres.create({
      data: createParametresDto,
    });
  }

  async findAll() {
    return this.prisma.parametres.findMany();
  }

  async findOne(id: string) {
    const parametres = await this.prisma.parametres.findUnique({
      where: { id },
    });

    if (!parametres) {
      throw new NotFoundException(`Paramètres avec l'ID ${id} non trouvés`);
    }

    return parametres;
  }

  async findFirst() {
    const parametres = await this.prisma.parametres.findFirst();

    if (!parametres) {
      throw new NotFoundException('Aucun paramètre configuré');
    }

    return parametres;
  }

  async update(id: string, updateParametresDto: UpdateParametresDto) {
    try {
      return await this.prisma.parametres.update({
        where: { id },
        data: updateParametresDto,
      });
    } catch (error) {
      throw new NotFoundException(`Paramètres avec l'ID ${id} non trouvés`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.parametres.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Paramètres avec l'ID ${id} non trouvés`);
    }
  }
}
