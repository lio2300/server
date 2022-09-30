/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { DogsCreateDto } from '../dto/dogs.dto';
import { DogsService } from '../service/service.service';

@Controller('dogs')
export class ControllerController {

    constructor(
        private dogsService: DogsService
    ){

    }

    @Get('all')
    getDogs(): Promise<DogsCreateDto[]>   {
        return this.dogsService.getDogs();
    }

    @Post('create')
    createDog(@Body() dog:DogsCreateDto): Promise<DogsCreateDto>   {
        return this.dogsService.createDog(dog);
    }

    @Post('multiple')
    createDogs(@Body() dog:DogsCreateDto[]): Promise<DogsCreateDto[]>   {
        return this.dogsService.createDogs(dog);
    }
}
