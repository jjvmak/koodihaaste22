import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantDTO } from '../DTOs/restaurant-dto';

import { RestaurantComponent } from './restaurant.component';

fdescribe('RestaurantComponent', () => {
  let component: RestaurantComponent;

  beforeEach(async () => {
    component = new RestaurantComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expand', () => {
    component.restaurant = openRestaurant;
    component.ngOnInit();
    expect(component.shouldExpand).toBeTruthy();
  });

  it('should collapse', () => {
    component.restaurant = closedRestaurant;
    component.ngOnInit();
    expect(component.shouldExpand).toBeFalse();
  });
});

const openRestaurant: RestaurantDTO = {
  id: '123',
  name: 'testi-ravinteli-1',
  openingHours: '10-20',
  votes: 1,
  dishes: [{ name: 'kalakeitto', price: '10e', attributes: [] }],
};

const closedRestaurant: RestaurantDTO = {
  id: '123',
  name: 'testi-ravinteli-1',
  openingHours: '',
  votes: 1,
  dishes: [],
};
