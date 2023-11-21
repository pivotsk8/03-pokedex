import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator"

export class CreatePokemonDto {
    @IsString()
    @MinLength(3)
    name: string

    @IsPositive()
    @IsInt()
    @Min(1)
    no: number
}
