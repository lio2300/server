/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DogsCreateDto } from '../dto/dogs.dto';
import { Dogs } from '../interfaces/dogs.interfaces';

export class DogsService {
    constructor(
        @InjectModel('Dogs') private dogsModel: Model<Dogs>
    ){

    }

    async getDogs():Promise<DogsCreateDto[]>{
        return await this.dogsModel.find();
    }

    async createDog(dog:DogsCreateDto):Promise<DogsCreateDto>{
        const newDog = new this.dogsModel(dog);
        return await newDog.save();
    }

    async createDogs(dogs:DogsCreateDto[]){
        let dogsSaved= [];
        for (const dog of dogs) {
            dogsSaved.push(await this.createDog(dog));
        }
        return dogsSaved;
    }
}
