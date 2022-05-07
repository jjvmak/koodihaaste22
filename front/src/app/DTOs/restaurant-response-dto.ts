import { RestaurantDTO } from './restaurant-dto';

export interface RestaurantResponseDTO {
  alreadyVote: string; // If non-null, contains the voted restaurant id for today
  date: string;
  restaurants: RestaurantDTO[];
}
