import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, IsUUID, Length } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @Length(3, 15)
  @ApiProperty({
    description: 'Nome de perfil. Deve conter de 3 a 15 letras',
    example: 'diegofreitas50',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Foto do perfil. Deve ser uma URL.',
    example: 'https://avatars.githubusercontent.com/u/92491721?v=4',
  })
  imageUrl: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id do Usuário detentor do perfil.',
    example: '728e20de-e51c-4a0e-9dbf-bbb1c0c6136a',
  })
  userId: string;

  @IsUUID(undefined, {each: true})
  @IsOptional()
  @ApiProperty({
    description: 'Lista com os Ids dos jogos',
    example: '0c4b59bb-e169-40a4-81f5-4c34d2c2ca4b',
  })
  games?: string[];
}
