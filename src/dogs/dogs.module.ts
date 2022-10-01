import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ControllerController } from './controller/controller.controller';
import { DogsService } from './service/service.service';
import { DogsSchema } from './schema/dogs.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Dogs', schema: DogsSchema }])],
  controllers: [ControllerController],
  providers: [DogsService],
})
export class DogsModule {}
