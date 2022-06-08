import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGamesProfileDto } from './dto/create-games-profile.dto';
import { UpdateGamesProfileDto } from './dto/update-games-profile.dto';

@Injectable()
export class GamesProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async addGame(dto: CreateGamesProfileDto) {
    const data: Prisma.GamesProfileCreateInput = {
      game: { connect: { id: dto.gameId } },
      profile: { connect: { id: dto.profileId } },
      favorite: dto.favorite,
    };

    return await this.prisma.gamesProfile
      .create({
        data,
        select: {
          game: {
            select: {
              id: true,
              title: true,
            },
          },
          profile: {
            select: {
              id: true,
              title: true,
            },
          },
          favorite: true,
        },
      })
      .catch(handleError);
  }

  async findOneProfile(id: string) {
    const record = await this.prisma.profile.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com id '${id}' não encontrado.`);
    }

    return await this.prisma.gamesProfile.findMany({
      where: { profileId: id },
      select: {
        id: true,
        game: {
          select: {
            title: true,
            year: true,
            genders: {
              select: {
                name: true,
              },
            },
          },
        },
        favorite: true,
      },
    });
  }

  async findById(id: string) {
    const record = await this.prisma.gamesProfile.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com id '${id}' não encontrado.`);
    }

    return record;
  }
  
  async updateFav(id: string, dto: UpdateGamesProfileDto) {
    await this.findById(id);

    await this.prisma.gamesProfile.findUnique({
      where: { id },
    });

    const data: Prisma.GamesProfileUpdateInput = {
      favorite: dto.favorite,
    };

    return this.prisma.gamesProfile
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.gamesProfile.findUnique({
      where: { id },
    });

    await this.prisma.gamesProfile.delete({
      where: { id },
    });
    throw new HttpException('', 204);
  }
}
