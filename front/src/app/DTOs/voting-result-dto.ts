import { RestaurantVotesDTO } from './restaurant-votes-dto';

export interface VotingResultDTO {
  date: string;
  results: RestaurantVotesDTO[];
}
