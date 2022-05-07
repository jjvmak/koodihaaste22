import { Component, Input, OnInit } from '@angular/core';
import { DishDTO } from '../DTOs/dish-dto';
import { RestaurantDTO } from '../DTOs/restaurant-dto';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant!: RestaurantDTO;
  shouldExpand: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log(this.restaurant);
    this.shouldExpand = this.checkIfShouldOpenTab(this.restaurant);
  }

  checkIfShouldOpenTab(restaurant: RestaurantDTO): boolean {
    return hasLunch(restaurant.openingHours) || hasDishes(restaurant.dishes);
  }
}

const hasLunch = (lunchInfo: string): boolean =>
  lunchInfo !== 'ei lounasta' && lunchInfo !== '';
const hasDishes = (dishes: DishDTO[]): boolean => {
  return dishes.some((value) => value.name !== '' || value.price !== '');
};
