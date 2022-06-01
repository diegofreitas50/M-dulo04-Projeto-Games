import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfileController } from './profile.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
