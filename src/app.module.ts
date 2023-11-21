import { join } from 'path'; //Node los paquetes de node generalmente van al inicio
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  //Los modulos (cuando tienen palabra module)siempre van en los imports
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    PokemonModule
  ],
})
export class AppModule { }
