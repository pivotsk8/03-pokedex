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
      //Con estas lineas los DTO's se les permite transformar la data segun los parametros que se les pusieron a estos ultimo(@IsString...)
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  //Aquie en el main le config.env no se toma encuenta este ultimo se tomara encuenta en los modulos a donde se importo,
  //  en el main no se puede importar
  await app.listen(process.env.PORT);
  console.log(`App runnig on port ${process.env.PORT}`)
}
bootstrap();
