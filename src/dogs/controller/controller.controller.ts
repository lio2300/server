/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { DogsTableDto } from '../dto/dogs-table.dto';
import { DogsCreateDto } from '../dto/dogs.dto';
import { Dogs } from '../interfaces/dogs.interfaces';
import { DogsService } from '../service/service.service';

@Controller('dogs')
export class ControllerController {
  constructor(private dogsService: DogsService) {}

  /**
   * *Make a call to the dog service and return the result processed depended of the params
   *
   * @param skip
   * @param limit
   * @param search
   * @param sortBy
   * @param orderBy
   * @returns {Promise<DogsTableDto>}
   */
  @Get('all')
  getDogs(
    @Query('skip') skip,
    @Query('limit') limit,
    @Query('search') search,
    @Query('sortBy') sortBy,
    @Query('orderBy') orderBy,
  ): Promise<DogsTableDto> {
    return this.dogsService.getDogs(skip, limit, search, sortBy, orderBy);
  }

  /**
   * *Request for get statistics data from the database for the charts
   *
   * @returns {Promise<any>}
   */
  @Get('statistics')
  getDogsStatics(): Promise<any> {
    return this.dogsService.getDogsStatistics();
  }

  /**
   * *Create a new Dog called to th dogs service
   *
   * @param dog DogsCreateDto
   * @returns {Promise<DogsCreateDto>}
   */
  @Post('create')
  createDog(@Body() dog: DogsCreateDto): Promise<DogsCreateDto> {
    return this.dogsService.createDog(dog);
  }

  /**
   * *Create many Dog called to th dogs service
   *
   * @param dog DogsCreateDto
   * @returns {Promise<DogsCreateDto[]>}
   */
  @Post('multiple')
  createDogs(@Body() dog: DogsCreateDto[]): Promise<DogsCreateDto[]> {
    return this.dogsService.createDogs(dog);
  }

  /**
   * *Delete a new Dog called to th dogs service
   *
   * @param id
   * @returns
   */
  @Delete('')
  deleteDogs(@Query() id: string): Promise<DogsCreateDto[]> {
    return this.dogsService.deleteDog(id);
  }
  /**
   * *Update a record called to th dogs service
   *
   * @param dog
   * @returns
   */
  @Post('update')
  updateDog(@Body() dog: Dogs): Promise<Dogs> {
    return this.dogsService.updateDog(dog);
  }
}
