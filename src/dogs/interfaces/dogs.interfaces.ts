/* eslint-disable prettier/prettier */
import { Document } from "mongoose";

export interface Dogs extends Document {
    name:string;
    latin_name:string;
    animal_type:string;
    active_time:string;
    length_min:string;
    length_max:string;
    weight_min:string;
    weight_max:string;
    lifespan:string;
    habitat:string;
    diet:string;
    geo_range:string;
    image_link:string;
    id:number;
}
