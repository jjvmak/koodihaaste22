import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { tap } from 'rxjs/operators';
import { DishDTO } from '../DTOs/dish-dto';
import { RestaurantDTO } from '../DTOs/restaurant-dto';
import { Vote } from '../models/user';
import { UserIdentityService } from '../services/user-identity.service';
import { VotingService } from '../services/voting.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant!: RestaurantDTO;
  votingEnabled = false;
  restaurantVotedToday = false;

  constructor(
    private votingService: VotingService,
    private identyService: UserIdentityService
  ) {}

  ngOnInit(): void {
    this.votingEnabled = this.hasLunch(this.restaurant);
    this.identyService.currentUser$
      .pipe(
        tap((value) => {
          console.log(value.vote.date);
          if (
            value.vote.restaurantId !== this.restaurant.id // TODO: compare dates
          ) {
            this.restaurantVotedToday = false;
          } else {
            this.restaurantVotedToday = true;
          }
        })
      )
      .subscribe();
  }

  hasLunch(restaurant: RestaurantDTO): boolean {
    return hasLunch(restaurant.openingHours) || hasDishes(restaurant.dishes);
  }

  vote() {
    this.restaurantVotedToday = true;

    const vote: Vote = {
      date: new Date(),
      restaurantId: this.restaurant.id,
      restaurantName: this.restaurant.name,
    };
    this.notifyIdentityServiceWithVote(vote);
    this.votingService.vote(this.restaurant.id).subscribe();
  }

  removeVote() {
    this.restaurantVotedToday = false;

    const vote: Vote = {
      date: new Date(),
      restaurantId: '',
      restaurantName: '',
    };
    this.notifyIdentityServiceWithVote(vote);
    this.votingService.vote(this.restaurant.id).subscribe();
  }

  private notifyIdentityServiceWithVote(vote: Vote) {
    this.identyService
      .getIdentityFromCookie()
      .pipe(
        tap((id) => {
          const user = this.identyService.getUserIdentyStore(id.id);
          user.vote = vote;
          this.identyService.notify(user);
        })
      )
      .subscribe();
  }
}

const hasLunch = (lunchInfo: string): boolean =>
  lunchInfo !== 'ei lounasta' && lunchInfo !== '';
const hasDishes = (dishes: DishDTO[]): boolean => {
  return dishes.some((value) => value.name !== '' || value.price !== '');
};
