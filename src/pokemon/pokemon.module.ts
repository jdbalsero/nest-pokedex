import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    //Se agrega al modulo el import de Modulo de Mongoose para poder crear el modelo en la DB
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      }
    ])
  ],
  //Se exporta la instancia de MongooseModule para que se pueda usar ese Modelo de Mongo en otros modulos
  exports:[MongooseModule]
})
export class PokemonModule {}
