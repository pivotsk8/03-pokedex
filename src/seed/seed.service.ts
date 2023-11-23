import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interface/poke-response.interface';


@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    //se creo una interface apra tener la data mas clar ay poder usar la respuesta teniendo claro su estructura
    const { data: { results } } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
    results.forEach(({ name, url }) => {
      const segments = url.split('/')
      const no = +segments[segments.length - 2]
      console.log(name, no)
    })

    return results
  }
}
