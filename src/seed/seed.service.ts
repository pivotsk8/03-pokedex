import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../pokemon/entities-schema/pokemon.entity'

import { PokeResponse } from './interface/poke-response.interface';
import { Model } from 'mongoose';
import { AxiosAdapte } from 'src/common/adapters/axios.adapter';



@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapte
  ) { };

  // una de las formas para hace la inserction
  // async executeSeed() {
  //   //Vamos a borrar la BD cada vez que se ejecute el SEED
  //   await this.pokemonModel.deleteMany({}); // = delete * from pokemons;

  //   //se creo una interface para tener la data mas clara y poder usar la respuesta teniendo claro su estructura
  //   const insertPromisesArray = []
  //   const { data: { results } } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

  //   results.forEach(({ name, url }) => {
  //     const segments = url.split('/')
  //     const no = +segments[segments.length - 2];

  //     // await this.pokemonModel.create({ name, no })

  //     //Otro metodo para poder hacer la inserccion sin necesidad de hace un llamado a cada iteracion
  //     insertPromisesArray.push(
  //       this.pokemonModel.create({ name, no }))
  //   });
  //   await Promise.all(insertPromisesArray);

  //   return 'Seed executed'
  // }

  //otra forma mas efficiente
  async executeSeed() {
    //Vamos a borrar la BD cada vez que se ejecute el SEED
    await this.pokemonModel.deleteMany({}); // = delete * from pokemons;

    //se creo una interface para tener la data mas clara y poder usar la respuesta teniendo claro su estructura
    const { results } = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    //Esto puede remplazar una interface 
    const pokemonToInsert: { name: string, no: number }[] = []

    results.forEach(({ name, url }) => {
      const segments = url.split('/')
      const no = +segments[segments.length - 2];

      pokemonToInsert.push({ name, no })
    });

    await this.pokemonModel.insertMany(pokemonToInsert)

    return 'Seed executed'
  }
}
