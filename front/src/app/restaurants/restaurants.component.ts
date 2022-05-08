import { Component, OnInit, ViewChild } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  share,
  switchMap,
  tap,
} from 'rxjs/operators';
import { defer, merge, Observable, of } from 'rxjs';
import { RestaurantDTO } from '../DTOs/restaurant-dto';
import { FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { VotingService } from '../services/voting.service';
import { UserIdentityService } from '../services/user-identity.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  citySearch = new FormControl('');
  restaurants$: Observable<RestaurantDTO[]>;

  constructor(
    private restaurantService: RestaurantService,
    private identityService: UserIdentityService
  ) {
    // Hacky way of notifying identity service
    const notify$ = this.identityService.getIdentityFromCookie().pipe(
      tap((value) => {
        const id = value.id;
        const current = this.identityService.getUserIdentyStore(id);
        if (current.id === '' && id !== '') {
          current.id = id;
        }
        this.identityService.notify(current);
      })
    );

    // Create search term observable and emit only if the value is changed
    // Add debounce time to reduce api calls
    const searchTerm$ = merge(
      defer(() => of(this.citySearch.value)),
      this.citySearch.valueChanges
    ).pipe(debounceTime(1000), distinctUntilChanged());

    // Use search term to fetch restaurants
    this.restaurants$ = searchTerm$.pipe(
      switchMap((searchTerm: string) =>
        this.restaurantService.getRestaurants(searchTerm).pipe(
          map((value) => value.restaurants),
          tap(() => notify$.subscribe())
        )
      ),
      share()
    );
  }

  ngOnInit(): void {}
}
