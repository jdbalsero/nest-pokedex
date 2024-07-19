import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    //Referencia a la DB
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    //Servir contenido estatico para la raiz del proyecto (pagina por default al hacer un GET a la raiz del proyecto)
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),
    PokemonModule,
    CommonModule
  ],
})
export class AppModule {}
