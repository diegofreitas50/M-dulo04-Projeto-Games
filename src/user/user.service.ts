import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll() {
    return 'Burcar todos os users';
  }

  create() {
    return 'Criar um user';
  }
}
