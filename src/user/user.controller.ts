import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('find')
  findAll() {
    return this.userService.findAll();
  }

  @Post('create')
  create() {
    return this.userService.create();
  }
}
