import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Es para precisar un prefijo a la url
  app.setGlobalPrefix('api/v2')

  //para poder usar los pipes de las validaciones(decoradores)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
  await app.listen(3000);
}
bootstrap();
