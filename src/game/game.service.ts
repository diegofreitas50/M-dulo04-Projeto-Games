import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.game.findMany({
      include: {
        genders: true,
      },
    });
  }

  async findById(id: string): Promise<Game> {
    const record = await this.prisma.game.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com id '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string) {
    return await this.prisma.game.findUnique({
      where: { id },
      include: { genders: true },
    });
  }

  async create(dto: CreateGameDto): Promise<Game> {
    const data: Prisma.GameUncheckedCreateInput = {
      profiles: {
        connect: dto.profiles.map((profileId) => ({
          id: profileId,
        })),
      },

      genders: {
        connect: dto.genders.map((gender) => ({
          name: gender,
        })),
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

  async update(id: string, dto: UpdateGameDto): Promise<Game> {
    await this.findById(id);

    const data = { ...dto };

    return this.prisma.game.update({ where: { id }, data }).catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.game.delete({ where: { id } });
  }
}
