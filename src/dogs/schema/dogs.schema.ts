/* eslint-disable prettier/prettier */
import mongoose from "mongoose";

export const DogsSchema = new mongoose.Schema({
    name:String,
    latin_name:String,
    animal_type:String,
    active_time:String,
    length_min:String,
    length_max:String,
    weight_min:String,
    weight_max:String,
    lifespan:String,
    habitat:String,
    diet:String,
    geo_range:String,
    image_link:String,
  });