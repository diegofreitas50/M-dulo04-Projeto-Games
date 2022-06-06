import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.profile.findMany();
  }

  async findById(id: string) {
    const record = await this.prisma.profile.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com id '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string) {
    return this.findById(id);
  }

  async create(dto: CreateProfileDto) {
    const data: Prisma.ProfileCreateInput = {
      title: dto.title,
      imageUrl: dto.imageUrl,
      user: {
        connect: {
          id: dto.userId,
        },
      },
    };

    return await this.prisma.profile
    .create({
      data,
      select: {
        id: true,
        imageUrl: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    .catch(handleError);
  }

  async update(id: string, dto: UpdateProfileDto) {
    await this.findById(id);

    const data: Prisma.ProfileUpdateInput = {
      title: dto.title,
      imageUrl: dto.imageUrl,
    };

    return this.prisma.profile
      .update({ where: { id }, data })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.profile.delete({ where: { id } });
  }
}
