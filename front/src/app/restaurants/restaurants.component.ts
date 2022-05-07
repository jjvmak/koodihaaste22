import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  share,
  switchMap,
  tap,
} from 'rxjs/operators';
import { BehaviorSubject, defer, merge, Observable, of } from 'rxjs';
import { RestaurantDTO } from '../DTOs/restaurant-dto';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  citySearch = new FormControl('');
  restaurants$: Observable<RestaurantDTO[]>;

  constructor(private restaurantService: RestaurantService) {
    // Create search term observable and emit only if the value is changed
    // Add debounce time to reduce api calls
    const searchTerm$ = merge(
      defer(() => of(this.citySearch.value)),
      this.citySearch.valueChanges
    ).pipe(
      debounceTime(1000),
      distinctUntilChanged()
      //tap((value) => console.log(value))
    );

    // Use search term to fetch restaurants
    this.restaurants$ = searchTerm$.pipe(
      switchMap((searchTerm: string) =>
        this.restaurantService.getRestaurants(searchTerm).pipe(
          map((value) => value.restaurants)
          //tap((value) => console.log(value))
        )
      ),
      share()
    );
  }

  ngOnInit(): void {}
}
