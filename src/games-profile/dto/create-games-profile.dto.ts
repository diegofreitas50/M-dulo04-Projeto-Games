import { IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGamesProfileDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do jogo.',
    example: '0c4b59bb-e169-40a4-81f5-4c34d2c2ca4b',
  })
  gameId: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id do perfil.',
    example: '3de266ec-c9cb-4dd1-aa01-cccfea805f62',
  })
  profileId: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Favoritar jogo?',
    example: true,
  })
  favorite: boolean;
}
