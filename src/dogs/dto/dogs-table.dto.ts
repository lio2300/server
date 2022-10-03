/* eslint-disable prettier/prettier */
import { DogsCreateDto } from './dogs.dto';

export class DogsTableDto {
  data: DogsCreateDto[];
  total: number;
}
