import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);

  // добавь в сваггер авторизацию через jwt, в доках неста есть
  const config = new DocumentBuilder()
        .setTitle('Trello-purr')
        .setDescription('Документация мини-приложения Trello-purr')
        .setVersion('1.0.0')
        .addTag('Purr')
        .build()
    const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document)

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

bootstrap();
