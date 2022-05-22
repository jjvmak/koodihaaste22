import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DishDTO } from '../DTOs/dish-dto';
import { RestaurantDTO } from '../DTOs/restaurant-dto';
import { Vote } from '../models/user';
import { UserIdentityService } from '../services/user-identity.service';
import { VotingService } from '../services/voting.service';
import { dateEquals } from '../utils/date-utils';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant!: RestaurantDTO;
  votingEnabled = false;
  restaurantVotedToday = false;
  validDishes!: boolean;

  constructor(
    private votingService: VotingService,
    private identyService: UserIdentityService
  ) {}

  ngOnInit(): void {
    this.validDishes = this.isValidDishes(this.restaurant);
    this.votingEnabled = this.hasLunch(this.restaurant);
    this.identyService.currentUser$
      .pipe(
        tap((value) => {
          if (
            value.vote.restaurantId !== this.restaurant.id ||
            !dateEquals(value.vote.date, new Date())
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
    return (
      restaurantHasLunch(restaurant.openingHours) ||
      hasDishes(restaurant.dishes)
    );
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

  // Check if dishes exist and some of them have a name
  isValidDishes(restaurant: RestaurantDTO): boolean {
    const maybeDishes = O.fromNullable(restaurant.dishes);
    return pipe(
      nonEmptyDishes(maybeDishes),
      E.fold(
        (err) => err,
        (a) => a
      )
    );
  }

  private notifyIdentityServiceWithVote(vote: Vote) {
    this.identyService
      .getIdentityFromCookie()
      .pipe(
        tap(() => {
          const user = this.identyService.getUserIdentyStore();
          user.vote = vote;
          this.identyService.notify(user);
        })
      )
      .subscribe();
  }
}

// Check if dishes have name
const nonEmptyDishes = (a: O.Option<DishDTO[]>): E.Either<boolean, boolean> =>
  pipe(
    a,
    O.chain(
      O.fromPredicate((s) => {
        return s.some((dish) => dish.name.length > 0);
      })
    ),
    O.fold(
      () => E.left(false),
      (a) => E.right(true)
    )
  );

const restaurantHasLunch = (lunchInfo: string): boolean =>
  lunchInfo !== 'ei lounasta' && lunchInfo !== '';
const hasDishes = (dishes: DishDTO[]): boolean => {
  return dishes.some((value) => value.name !== '' || value.price !== '');
};
