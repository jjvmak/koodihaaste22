import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RestaurantDTO } from '../DTOs/restaurant-dto';
import { RestaurantResponseDTO } from '../DTOs/restaurant-response-dto';
import { RestaurantService } from '../services/restaurant.service';
import { TestScheduler } from 'rxjs/testing';
import { RestaurantsComponent } from './restaurants.component';

describe('RestaurantsComponent', () => {
  let scheluder: TestScheduler;
  let component: RestaurantsComponent;
  let restaurantServiceSpy: jasmine.SpyObj<RestaurantService>;

  beforeEach(async () => {
    scheluder = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    restaurantServiceSpy = jasmine.createSpyObj<RestaurantService>([
      'getRestaurants',
    ]);

    restaurantServiceSpy.getRestaurants.and.callFake((param) => {
      if (param === 'testi-kaupunki') {
        return of(restaurantResponse);
      } else {
        return of(missing);
      }
    });

    component = new RestaurantsComponent(restaurantServiceSpy);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get restaurants', () => {
    component.citySearch.setValue('testi-kaupunki');
    scheluder.run(() => {
      component.restaurants$.subscribe((value) =>
        expect(value).toBe(restaurantResponse.restaurants)
      );
    });
  });

  it('should get missing', () => {
    component.citySearch.setValue('ei oo tämmöstä');
    scheluder.run(() => {
      component.restaurants$.subscribe((value) =>
        expect(value).toBe(missing.restaurants)
      );
    });
  });
});

const restaurants: RestaurantDTO[] = [
  {
    id: '123',
    name: 'testi-ravinteli-1',
    openingHours: '10-20',
    votes: 1,
    dishes: [{ name: 'kalakeitto', price: '10e', attributes: [] }],
  },
  {
    id: '456',
    name: 'testi-ravinteli-2',
    openingHours: '9-20',
    votes: 1,
    dishes: [{ name: 'purilainen', price: '12e', attributes: ['on hyvä'] }],
  },
];

const restaurantResponse: RestaurantResponseDTO = {
  alreadyVote: '',
  date: '2022-05-07',
  restaurants: restaurants,
};

const missing: RestaurantResponseDTO = {
  alreadyVote: '',
  date: '',
  restaurants: [],
};
