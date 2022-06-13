import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { isAdmin } from '../utils/is-admin.util';
import { User } from 'src/user/entities/user.entity';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, dto: CreateGameDto) {
    isAdmin(user);

    const data: Prisma.GameCreateInput = {
      genders: {
        connectOrCreate: {
          create: { name: this.dataTreatment(dto.genders) },
          where: { name: this.dataTreatment(dto.genders) },
        },
      },

      title: dto.title,
      coverImageUrl: dto.coverImageUrl,
      description: dto.description,
      year: dto.year,
      imdbScore: dto.imdbScore,
      trailerYouTubeUrl: dto.trailerYouTubeUrl,
      gameplayYouTubeUrl: dto.gameplayYouTubeUrl,
    };

    return await this.prisma.game.create({ data }).catch(handleError);
  }

  async findAll(): Promise<Game[]> {
    const allGames = await this.prisma.game.findMany({
      include: {
        genders: true,
      },
    });

    if (allGames.length === 0) {
      throw new NotFoundException('Não há jogos cadastrados.');
    }

    return allGames;
  }

  async findById(id: string) {
    const record = await this.prisma.game.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com id '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Game> {
    await this.findById(id);

    return await this.prisma.game.findUnique({
      where: { id },
      include: { genders: true },
    });
  }

  async update(user: User, id: string, dto: UpdateGameDto): Promise<Game> {
    isAdmin(user);

    await this.findById(id);

    const data: Prisma.GameUpdateInput = {
      genders: {
        connectOrCreate: {
          create: { name: this.dataTreatment(dto.genders) },
          where: { name: this.dataTreatment(dto.genders) },
        },
      },
    };

    return this.prisma.game.update({ where: { id }, data }).catch(handleError);
  }

  async delete(user: User, id: string) {
    isAdmin(user);

    await this.findById(id);

    await this.prisma.game.delete({ where: { id } });
  }

  dataTreatment(data: string) {
    return data
      .normalize('NFD')
      .replace(/[^a-zA-Zs]/g, '')
      .toLowerCase();
  }
}
