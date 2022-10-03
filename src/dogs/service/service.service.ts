/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DogsTableDto } from '../dto/dogs-table.dto';
import { DogsCreateDto } from '../dto/dogs.dto';
import { Dogs } from '../interfaces/dogs.interfaces';

export class DogsService {
  constructor(@InjectModel('Dogs') private dogsModel: Model<Dogs>) {}

  async getDogs(skip: number, limit: number): Promise<DogsTableDto> {
    const data = await this.dogsModel
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    const total = await this.dogsModel.count();
    return { data, total };
  }

  async createDog(dog: DogsCreateDto): Promise<DogsCreateDto> {
    const newDog = new this.dogsModel(dog);
    return await newDog.save();
  }

  async createDogs(dogs: DogsCreateDto[]) {
    let dogsSaved = [];
    for (const dog of dogs) {
      dogsSaved.push(await this.createDog(dog));
    }
    return dogsSaved;
  }

  async deleteDog(_id: string): Promise<any> {
    return await this.dogsModel.findByIdAndDelete(_id);
  }

  async updateDog(dog: DogsCreateDto): Promise<DogsCreateDto> {
    const newDog = new this.dogsModel(dog);
    return await newDog.update();
  }
}
