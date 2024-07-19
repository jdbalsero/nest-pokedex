import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//La annotation Schema le da a la clase la propiedad de Schema de Mongo con Mongoose
@Schema()
//El extends a Document le agrega a la Entity la posibilidad de manejarse como Documento (Coleccion) de Mongo
export class Pokemon extends Document{

    //El decorador Prop le agrega las propiedades de los campos de Mongo
    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })
    no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);