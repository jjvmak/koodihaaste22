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
import { UserIdentityService } from '../services/user-identity.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  readonly searchTermDebounce = 500;

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  citySearch = new FormControl('');
  restaurants$: Observable<RestaurantDTO[]>;

  constructor(
    private restaurantService: RestaurantService,
    private identityService: UserIdentityService
  ) {
    // Get the voter id from the cookie and notify identity service
    // If the id does not match the strored user id the old value will be replaced with new valua
    const notify$ = this.identityService.getIdentityFromCookie().pipe(
      tap((value) => {
        const current = this.identityService.getUserIdentyStore();
        current.id = value.id;
        this.identityService.notify(current);
      })
    );

    // Create search term observable and emit only if the value is changed
    // Add debounce time to reduce api calls
    const searchTerm$ = merge(
      defer(() => of(this.citySearch.value)),
      this.citySearch.valueChanges
    ).pipe(debounceTime(this.searchTermDebounce), distinctUntilChanged());

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
