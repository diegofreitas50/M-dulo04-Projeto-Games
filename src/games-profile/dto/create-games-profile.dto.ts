import { IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGamesProfileDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do jogo.',
    example: 'e0673bf6-a645-418f-a91e-95a60c3bf9a9',
  })
  gameId: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id do perfil.',
    example: '245531f7-3f72-4815-86f5-51a8d494578a',
  })
  profileId: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Favoritar jogo?',
    example: true,
  })
  favorite: boolean;
}
