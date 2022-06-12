import { Module } from '@nestjs/common';
import { GamesProfileService } from './games-profile.service';
import { GamesProfileController } from './games-profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [GamesProfileController],
  providers: [GamesProfileService],
})
export class GamesProfileModule {}
