/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DogsTableDto } from '../dto/dogs-table.dto';
import { DogsCreateDto } from '../dto/dogs.dto';
import { Dogs } from '../interfaces/dogs.interfaces';

export class DogsService {
  constructor(@InjectModel('Dogs') private dogsModel: Model<Dogs>) {}

  async getDogs(
    skip: number,
    limit: number,
    search: string,
    sortBy: string,
    orderBy: string,
  ): Promise<DogsTableDto> {
    const filters = {
      name: 'name',
      latin_name: 'latin_name',
      animal_type: 'animal_type',
      geo_range: 'geo_range',
      habitat: 'habitat',
    };
    const orders = {
      asc: 1,
      desc: -1,
    };

    const order = !orders[orderBy] ? -1 : orders[orderBy];

    const sort = !filters[sortBy]
      ? { _id: -1 }
      : JSON.parse(`{ "${filters[sortBy]}" : ${order} }`);

    const expressions = [
      { name: new RegExp(search, 'gi') },
      { latin_name: new RegExp(search, 'gi') },
      { animal_type: new RegExp(search, 'gi') },
      { geo_range: new RegExp(search, 'gi') },
      { habitat: new RegExp(search, 'gi') },
    ];

    const data = await this.dogsModel
      .find({
        $or: expressions,
      })
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const total = await this.dogsModel
      .find({
        $or: expressions,
      })
      .count();
    return { data, total };
  }

  async getDogsStatistics(): Promise<any> {
    const barChartData = await this.dogsModel.aggregate([
      { $group: { _id: '$animal_type', count: { $sum: 1 } } },
    ]);

    return { barChartData };
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

  async deleteDog(_id: string): Promise<DogsCreateDto[]> {
    return await this.dogsModel.findByIdAndDelete(_id);
  }

  async updateDog(dog: Dogs): Promise<Dogs> {
    return await this.dogsModel.findByIdAndUpdate(dog._id, dog, { new: true });
  }
}
