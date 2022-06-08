import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

class FavUpdate {
  @IsBoolean()
  @ApiProperty({
    description: 'Favoritar jogo?',
    example: true,
  })
  favorite: boolean;
}

export class UpdateGamesProfileDto extends PartialType(FavUpdate) {}
