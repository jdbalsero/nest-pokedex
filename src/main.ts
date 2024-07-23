import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //prefijo global para las rutas
  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      //Configuraciones para que en los DTO elimine los campos extra y valide los sobrantes como error
      whitelist: true,
      forbidNonWhitelisted: true,
      //Configuraciones para que transforme los params de los DTO a su tipo de dato esperado
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  await app.listen(process.env.PORT);
  console.log(`App running on port ${ process.env.PORT }`)
}
bootstrap();
