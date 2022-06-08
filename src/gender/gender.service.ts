import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GenderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGenderDto) {
    const data: Prisma.GenderCreateInput = { name: dto.name };

    data.name = this.dataTreatment(data.name);

    return await this.prisma.gender.create({ data }).catch(handleError);
  }

  async findAll() {
    const allGenders = await this.prisma.gender.findMany();

    if (allGenders.length === 0) {
      throw new NotFoundException('Não há gêneros cadastrados.');
    }

    return allGenders;
  }

  async findById(id: string) {
    const record = await this.prisma.gender.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com id '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string) {
    await this.findById(id);

    return await this.prisma.gender.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateGenderDto) {
    await this.findById(id);

    const data: Partial<Gender> = { ...dto };

    data.name = await this.dataTreatment(data.name);

    return this.prisma.gender
      .update({ where: { id }, data })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.gender.delete({ where: { id } });

    throw new HttpException('', 204);
  }

  dataTreatment(data: string) {
    return data
      .normalize('NFD')
      .replace(/[^a-zA-Zs]/g, '')
      .toLowerCase();
  }
}
