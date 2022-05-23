import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class CreateUserDto {
  @Length(3, 15)
  @ApiProperty({
    description: 'O nome do usuário deve conter de 3 a 15 caracteres!',
    example: 'Username',
  })
  name: string;
}
