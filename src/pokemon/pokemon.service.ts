import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities-schema/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';
import { PaginationDto } from '../common/dto/pagination.dto';


@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>) { }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleUpperCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    }

    catch (error: any) {
      this.handlerException(error)
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto

    //pagination 
    return this.pokemonModel.find()
      .limit(limit)
      //El skip te muestra los pokemons desde elnumero que se indica ej(1,2,3) si pasas en el skip 1 te va a mostrar (2,3,4)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v')
  }

  async findOne(term: string) {
    //Pokemon con P mayuscula hace referencia a la entities/schema  
    let pokemon: Pokemon
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term })
    }

    //MongoId
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term)
    }

    //Name 
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() })

    }

    //Error
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);
    }


    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term)
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toUpperCase();

    try {

      await pokemon.updateOne(updatePokemonDto, { new: true })

      return { ...pokemon.toJSON(), ...updatePokemonDto }
    } catch (error: any) {
      this.handlerException(error)
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();

    // const result = await this.pokemonModel.findByIdAndDelete(id)

    // cuidado con esto de no usar el deletemany borraria toda la BD

    //con esta consulta hago un solo request a la BD
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id })
    if (!deletedCount) {
      throw new BadRequestException(`Pokemon with id "${id}" not found`)
    };

    return;
  }

  private handlerException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon ya existe ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException('No se pudo crear el pokemon - Ver logs del servidor');
  }
}

