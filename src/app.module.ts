import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    //Importar NestJS Config para las variables de entorno
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      //Validation schema con la libreria Joi para reforzar manejo de errores en las variables de entorno
      validationSchema: JoiValidationSchema
    }),

    //Servir contenido estatico para la raiz del proyecto (pagina por default al hacer un GET a la raiz del proyecto)
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),

    //Referencia a la DB
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'pokemonsDB'
    }),
    
    PokemonModule,
    CommonModule,
    SeedModule
  ],
})
export class AppModule {}
