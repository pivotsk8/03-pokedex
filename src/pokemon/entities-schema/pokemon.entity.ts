import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

//Schema de como se va a guardar a  ver en la BD de Mongo
@Schema()
export class Pokemon extends Document {
    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })
    no: number
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon)