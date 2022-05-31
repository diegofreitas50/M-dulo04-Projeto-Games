import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { GameModule } from './game/game.module';
import { GenderModule } from './gender/gender.module';

@Module({
  imports: [UserModule, PrismaModule, GameModule, GenderModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
