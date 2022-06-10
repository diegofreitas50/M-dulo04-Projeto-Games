import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { GameModule } from './game/game.module';
import { GenderModule } from './gender/gender.module';
import { ProfileModule } from './profile/profile.module';
import { GamesProfileModule } from './games-profile/games-profile.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UserModule, PrismaModule, GameModule, GenderModule, ProfileModule, GamesProfileModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
