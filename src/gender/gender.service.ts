import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GenderService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Gender[]> {
    return this.prisma.gender.findMany();
  }

  async findById(id: string): Promise<Gender> {
    const record = await this.prisma.gender.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com id '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Gender> {
    return this.findById(id);
  }

  create(dto: CreateGenderDto): Promise<Gender> {
    const data: Gender = { ...dto };

    try {
      return this.prisma.gender.create({ data });
    } catch (error) {
      return handleError(error);
    }
  }

  async update(id: string, dto: UpdateGenderDto): Promise<Gender> {
    await this.findById(id);

    const data: Partial<Gender> = { ...dto };

    return this.prisma.gender
      .update({ where: { id }, data })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.gender.delete({ where: { id } });
  }
}
