import { DishDTO } from './dish-dto';

export interface RestaurantDTO {
  id: string; // Restaurant id to be used in voting requests. SHA256 of city and restaurant name
  name: string;
  openingHours: string;
  votes: number;
  dishes: DishDTO[];
}
