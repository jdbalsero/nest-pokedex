import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  

  constructor(
    //Decorador de Nest Mongoose para poder inyectar el modelo en cualquier servicio
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ){}

  async executeSeed() {

    await this.pokemonModel.deleteMany({}); //delete all pokemons first

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonsToInsert: {name:string, no:number}[] = [];

    data.results.forEach(({name, url}) => {

      const segments = url.split('/');
      const no: number = +segments[segments.length-2];
      
      pokemonsToInsert.push({name, no});

    });

    await this.pokemonModel.insertMany(pokemonsToInsert);

    return `Seed Executed.`;
  }

}
