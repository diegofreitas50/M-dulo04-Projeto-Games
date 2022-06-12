import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT gerado pelo login.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpZWdvZnJlaXRhczUwQGhvdG1haWwuY29tIiwiaWF0IjoxNjU1MDAwNDQ0LCJleHAiOjE2NTUwODY4NDR9.4JCTaMxdYZr-53RVN7QOtonstq7Twn_RYI9LZ7x5mqs',
  })
  token: string;

  @ApiProperty({
    description: 'Dados do usuário autenticado.',
  })
  user: User;
}
