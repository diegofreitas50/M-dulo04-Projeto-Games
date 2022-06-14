import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

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
          title: true,
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

  async findAll(userId: string) {
    await this.findById(userId);

    const allProfilles = await this.prisma.profile.findMany({
      where: { userId },
      select: {
        id: true,
        imageUrl: true,
        title: true,
      },
    });

    if (allProfilles.length === 0){
      throw new NotFoundException('Não há perfis cadastrados para este userId.');
    }

    return allProfilles;
  }

  async findById(id: string) {
    const record = await this.prisma.profile.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com id '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string) {
    await this.findById(id);

    return await this.prisma.profile.findUnique({
      where: { id },
      select: {
        title: true,
        imageUrl: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: { select: { games: true } },
      },
    });
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
