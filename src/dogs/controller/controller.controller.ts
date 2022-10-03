/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DogsTableDto } from '../dto/dogs-table.dto';
import { DogsCreateDto } from '../dto/dogs.dto';
import { DogsService } from '../service/service.service';

@Controller('dogs')
export class ControllerController {
  constructor(private dogsService: DogsService) {}

  @Get('all')
  getDogs(@Query('skip') skip, @Query('limit') limit): Promise<DogsTableDto> {
    return this.dogsService.getDogs(skip, limit);
  }

  @Post('create')
  createDog(@Body() dog: DogsCreateDto): Promise<DogsCreateDto> {
    return this.dogsService.createDog(dog);
  }

  @Post('multiple')
  createDogs(@Body() dog: DogsCreateDto[]): Promise<DogsCreateDto[]> {
    return this.dogsService.createDogs(dog);
  }

  @Delete('')
  deleteDogs(@Query() id: any): Promise<DogsCreateDto[]> {
    return this.dogsService.deleteDog(id);
  }

  @Post('update')
  updateDog(@Body() dog: DogsCreateDto): Promise<DogsCreateDto> {
    return this.dogsService.updateDog(dog);
  }
}
