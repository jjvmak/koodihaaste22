import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DishDTO } from '../DTOs/dish-dto';
import { RestaurantDTO } from '../DTOs/restaurant-dto';
import { VotingService } from '../services/voting.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant!: RestaurantDTO;
  votingEnabled: boolean = false;

  constructor(private votingService: VotingService) {}

  ngOnInit(): void {
    this.votingEnabled = this.hasLunch(this.restaurant);
  }

  hasLunch(restaurant: RestaurantDTO): boolean {
    return hasLunch(restaurant.openingHours) || hasDishes(restaurant.dishes);
  }

  vote() {
    this.votingService.vote(this.restaurant.id).subscribe();
  }
}

const hasLunch = (lunchInfo: string): boolean =>
  lunchInfo !== 'ei lounasta' && lunchInfo !== '';
const hasDishes = (dishes: DishDTO[]): boolean => {
  return dishes.some((value) => value.name !== '' || value.price !== '');
};
