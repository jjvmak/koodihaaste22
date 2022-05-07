import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantDTO } from '../DTOs/restaurant-dto';
import { VotingService } from '../services/voting.service';

import { RestaurantComponent } from './restaurant.component';

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let votingServiceSpy: jasmine.SpyObj<VotingService>;
  beforeEach(async () => {
    votingServiceSpy = jasmine.createSpyObj<VotingService>(['vote']);
    component = new RestaurantComponent(votingServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expand', () => {
    component.restaurant = openRestaurant;
    component.ngOnInit();
    expect(component.votingEnabled).toBeTruthy();
  });

  it('should collapse', () => {
    component.restaurant = closedRestaurant;
    component.ngOnInit();
    expect(component.votingEnabled).toBeFalse();
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
