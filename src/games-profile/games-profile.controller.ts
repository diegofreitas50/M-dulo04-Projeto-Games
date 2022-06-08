import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GamesProfileService } from './games-profile.service';
import { CreateGamesProfileDto } from './dto/create-games-profile.dto';
import { UpdateGamesProfileDto } from './dto/update-games-profile.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('games-profile')
@Controller()
export class GamesProfileController {
  constructor(private readonly gamesProfileService: GamesProfileService) {}

  @Post('/games-profile')
  @ApiOperation({
    summary: 'Adicionar jogo ao Perfil (addGame).',
  })
  create(@Body() dto: CreateGamesProfileDto) {
    return this.gamesProfileService.addGame(dto);
  }

  @Get('homepage/:profileId')
  @ApiOperation({
    summary: 'Lista de Jogos do perfil pelo Id.',
  })
  findOne(@Param('profileId') id: string) {
    return this.gamesProfileService.findOneProfile(id);
  }

  @Patch('games-profile/:gamesProfileId')
  @ApiOperation({
    summary: 'Favoritar ou desfavoritar um jogo pelo Id do addGame. ',
  })
  update(
    @Param('gamesProfileId') id: string,
    @Body() dto: UpdateGamesProfileDto,
  ) {
    return this.gamesProfileService.updateFav(id, dto);
  }

  @Delete('games-profile/:gamesProfileId')
  @ApiOperation({
    summary: 'Remover jogo do Perfil prlo Id do addGame.',
  })
  delete(@Param('gamesProfileId') id: string) {
    return this.gamesProfileService.delete(id);
  }
}
