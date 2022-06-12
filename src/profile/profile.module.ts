import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfileController } from './profile.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
