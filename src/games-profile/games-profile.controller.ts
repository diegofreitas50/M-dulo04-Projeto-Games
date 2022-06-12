import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GamesProfileService } from './games-profile.service';
import { CreateGamesProfileDto } from './dto/create-games-profile.dto';
import { UpdateGamesProfileDto } from './dto/update-games-profile.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller()
export class GamesProfileController {
  constructor(private readonly gamesProfileService: GamesProfileService) {}

  @ApiTags('games-profile')
  @Post('/games-profile')
  @ApiOperation({
    summary: 'Adicionar jogo ao Perfil (addGame).',
  })
  create(@Body() dto: CreateGamesProfileDto) {
    return this.gamesProfileService.addGame(dto);
  }

  @ApiTags('homepage')
  @Get('homepage/:profileId')
  @ApiOperation({
    summary: 'Lista de Jogos do perfil pelo Id.',
  })
  findOne(@Param('profileId') id: string) {
    return this.gamesProfileService.findOneProfile(id);
  }

  @ApiTags('games-profile')
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

  @ApiTags('games-profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('games-profile/:gamesProfileId')
  @ApiOperation({
    summary: 'Remover jogo do Perfil prlo Id do addGame.',
  })
  delete(@Param('gamesProfileId') id: string) {
    return this.gamesProfileService.delete(id);
  }
}
