import { Component, OnInit, ViewChild } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap,
  share,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { combineLatest, defer, interval, merge, Observable, of } from 'rxjs';
import { RestaurantDTO } from '../DTOs/restaurant-dto';
import { FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  citySearch = new FormControl('');
  restaurants$: Observable<RestaurantDTO[]>;

  constructor(restaurantService: RestaurantService) {
    this.restaurants$ = interval(1000).pipe(
      mergeMap(() => restaurantService.getRestaurants(this.citySearch.value)),
      map((value) => value.restaurants),
      distinctUntilChanged((prev, cur) => {
        return JSON.stringify(prev) === JSON.stringify(cur);
      })
    );
    // .pipe(tap((value) => console.log(value)));
  }

  ngOnInit(): void {}
}
