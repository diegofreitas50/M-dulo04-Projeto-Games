import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('create-user')
  @Post('create')
  @ApiOperation({ summary: 'Criar um usuário' })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiTags('user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('find')
  @ApiOperation({ summary: 'Listar todos os usuários. Somente para Admin.' })
  findAll(@LoggedUser() user: User) {
    return this.userService.findAll(user);
  }

  @ApiTags('user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Visualizar um usuário pelo Id. Somente para Admin.' })
  findOne(@LoggedUser() user: User, @Param('id') id: string) {
    return this.userService.findOne(user, id);
  }

  @ApiTags('user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Editar um usuário pelo id. Somente para Admin.' })
  update(@LoggedUser() user: User, @Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(user, id, dto);
  }

  @ApiTags('user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({
    summary: 'Remover um usuário pelo id. Somente para Admin.',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    return this.userService.delete(user, id);
  }
}
