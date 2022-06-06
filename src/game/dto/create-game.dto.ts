import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do jogo.',
    example: 'Super Mario World',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Capa do jogo.',
    example:
      'https://upload.wikimedia.org/wikipedia/pt/thumb/0/06/Super-Mario-World.jpg/405px-Super-Mario-World.jpg',
  })
  coverImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição do jogo.',
    example:
      'A história segue a jornada de Mario para salvar a Princesa Toadstool e a Dinosaur Land do antagonista Bowser e de seus capangas, os Koopalings.',
  })
  description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Ano de lançamento do jogo.',
    example: 1990,
  })
  year: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Score no IMDB',
    example: 9.2,
  })
  imdbScore: number;

  @IsUrl()
  @ApiProperty({
    description: 'Trailer do Jogo.',
    example: 'https://youtu.be/RJ1w-venSAE',
  })
  trailerYouTubeUrl: string;

  @IsUrl()
  @ApiProperty({
    description: 'Gameplay do Jogo.',
    example: 'https://youtu.be/AqturoCh5lM',
  })
  gameplayYouTubeUrl: string;

  @IsUUID(undefined, {each: true})
  @ApiProperty({
    description: 'Lista dos Generos dos jogos',
    example: '0c4b59bb-e169-40a4-81f5-4c34d2c2ca4b',
  })
  genders: string[];

  @IsString()
  @ApiProperty({
    description: 'Lista com os IDs dos perfis ',
    example: '0c4b59bb-e169-40a4-81f5-4c34d2c2ca4b',
  })
  profiles: string[];
}
