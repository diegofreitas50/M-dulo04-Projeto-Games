import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGameDto) {
    const data: Prisma.GameCreateInput = {
      genders: {
        connectOrCreate: {
          create: { name: dto.genders },
          where: { name: dto.genders },
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

  async findAll() {
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

  async findOne(id: string) {
    await this.findById(id);

    return await this.prisma.game.findUnique({
      where: { id },
      include: { genders: true },
    });
  }

  async update(id: string, dto: UpdateGameDto) {
    await this.findById(id);

    const data = { ...dto };

    return this.prisma.game.update({ where: { id }, data }).catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.game.delete({ where: { id } });

    throw new HttpException('Deletado com sucesso.', 204);
  }
}
