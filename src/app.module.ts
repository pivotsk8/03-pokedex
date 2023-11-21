import { join } from 'path'; //Node los paquetes de node generalmente van al inicio
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  //Los modulos (cuando tienen palabra module)siempre van en los imports
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    //Referencia a la base de datos ver https://docs.nestjs.com/techniques/mongodb
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),

    PokemonModule
  ],
})
export class AppModule { }
