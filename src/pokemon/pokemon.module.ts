import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities-schema/pokemon.entity';

import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      }
    ])
  ],
  //Aqui estoy exportantdo el modulo de mongoose para poder usar el schema en otro modulo
  exports: [MongooseModule]
})
export class PokemonModule { }
