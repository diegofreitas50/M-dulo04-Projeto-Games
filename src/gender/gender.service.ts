import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/handle-error.util';
import { isAdmin } from 'src/utils/is-admin.util';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GenderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, dto: CreateGenderDto): Promise<Gender> {
    isAdmin(user);

    const data: Prisma.GenderCreateInput = { name: dto.name };

    data.name = this.dataTreatment(data.name);

    return await this.prisma.gender.create({ data }).catch(handleError);
  }

  async findAll(): Promise<Gender[]> {
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

  async findOne(id: string): Promise<Gender> {
    await this.findById(id);

    return await this.prisma.gender.findUnique({ where: { id } });
  }

  async update(user: User, id: string, dto: UpdateGenderDto) {
    isAdmin(user);

    await this.findById(id);

    const data: Partial<Gender> = { ...dto };

    data.name = this.dataTreatment(data.name);

    return this.prisma.gender
      .update({ where: { id }, data })
      .catch(handleError);
  }

  async delete(user: User, id: string) {
    isAdmin(user);

    await this.findById(id);

    await this.prisma.gender.delete({ where: { id } });
  }

  dataTreatment(data: string) {
    return data
      .normalize('NFD')
      .replace(/[^a-zA-Zs]/g, '')
      .toLowerCase();
  }
}
