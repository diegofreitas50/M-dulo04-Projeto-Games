import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'E-mail do usuário.',
    example: 'diegofreitas50@hotmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha do usuário para login',
    example: 'P@$sw0rd'
  })
  passWord: string;
}
