import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Gaming platform')
    .setDescription('Aplicação para gestão de jogos em uma plataforma')
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('auth')
    .addTag('create-user')
    .addTag('user')
    .addTag('profile')
    .addTag('game')
    .addTag('gender')
    .addTag('games-profile')
    .addTag('homepage')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
