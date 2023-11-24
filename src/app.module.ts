import { join } from 'path'; //Node los paquetes de node generalmente van al inicio
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  //Los modulos (cuando tienen palabra module)siempre van en los imports
  imports: [
    //generalmente esta linea va arriba ya que es ella la que nos ayuda a configurar y tener acceso a las .env
    ConfigModule.forRoot({
      //estos dos pueden trabajar en conjunto 
      load: [EnvConfiguration],
      //igualmente va ha hacer validaciones para las variables de entorno
      validationSchema: JoiValidationSchema
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    //Referencia a la base de datos ver https://docs.nestjs.com/techniques/mongodb
    MongooseModule.forRoot(process.env.MONGODB),
    PokemonModule,
    CommonModule,
    SeedModule
  ]

})
export class AppModule { }
