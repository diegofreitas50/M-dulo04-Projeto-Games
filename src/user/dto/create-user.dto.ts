import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @Length(3, 30)
  @IsString()
  @ApiProperty({
    description: 'Nome do usuário deve conter de 3 a 30 letras',
    example: 'Diego Freitas dos Santos',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'E-mail de usuário',
    example: 'diegofreitas50@hotmail.com',
  })
  email: string;

  @MinLength(6)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'senha muito fraca',
  })
  @ApiProperty({
    description:
      'Senha do usuário. Requer letras maiúsculas e minúsculas, números ou caracters especial',
    example: 'P@$sw0rd',
  })
  password: string;

  @ApiProperty({
    description: 'Confirmação da senha',
    example: 'P@$sw0rd',
  })
  confirmPassword: string;

  @Length(11, 11)
  @Matches(/^[0-9]*$/, {
    message: 'CPF inválido.',
  })
  @ApiProperty({
    description: 'CPF do usuário. somente números',
    example: '12345678910',
  })
  cpf: string;

  @ApiProperty({
    description: 'Declaração de Adm.',
    example: false,
  })
  isAdmin: boolean;
}
