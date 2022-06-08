import { Module } from '@nestjs/common';
import { GamesProfileService } from './games-profile.service';
import { GamesProfileController } from './games-profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GamesProfileController],
  providers: [GamesProfileService],
})
export class GamesProfileModule {}
