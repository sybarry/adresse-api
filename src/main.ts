import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active la validation globale
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Permet de transformer les données en instances des classes
    whitelist: true, // Enlève les propriétés qui ne sont pas définies dans le DTO
    forbidNonWhitelisted: true, // Retourne une erreur si des propriétés non autorisées sont envoyées
  }));

  await app.listen(8000);
}
bootstrap();
