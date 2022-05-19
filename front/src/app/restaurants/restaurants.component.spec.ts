import { of } from 'rxjs';
import { RestaurantDTO } from '../DTOs/restaurant-dto';
import { RestaurantResponseDTO } from '../DTOs/restaurant-response-dto';
import { RestaurantService } from '../services/restaurant.service';
import { TestScheduler } from 'rxjs/testing';
import { RestaurantsComponent } from './restaurants.component';
import { UserIdentityService } from '../services/user-identity.service';
import { User } from '../models/user';
import { UserIdDTO } from '../DTOs/user-id-dto';

describe('RestaurantsComponent', () => {
  let scheluder: TestScheduler;
  let component: RestaurantsComponent;
  let restaurantServiceSpy: jasmine.SpyObj<RestaurantService>;
  let identyServiceSpy: jasmine.SpyObj<UserIdentityService>;
  beforeEach(async () => {
    scheluder = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    restaurantServiceSpy = jasmine.createSpyObj<RestaurantService>([
      'getRestaurants',
    ]);
    identyServiceSpy = jasmine.createSpyObj<UserIdentityService>([
      'notify',
      'getIdentityFromCookie',
      'currentUser$',
      'getUserIdentyStore',
    ]);

    identyServiceSpy.currentUser$ = of(userWithVote);
    identyServiceSpy.getIdentityFromCookie.and.returnValue(of(useridDTO));
    identyServiceSpy.getUserIdentyStore.and.returnValue(userWithVote);

    restaurantServiceSpy.getRestaurants.and.callFake((param) => {
      if (param === 'testi-kaupunki') {
        return of(restaurantResponse);
      } else {
        return of(missing);
      }
    });

    component = new RestaurantsComponent(
      restaurantServiceSpy,
      identyServiceSpy
    );
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
  alreadyVoted: '',
  date: '2022-05-07',
  restaurants: restaurants,
};

const missing: RestaurantResponseDTO = {
  alreadyVoted: '',
  date: '',
  restaurants: [],
};

const userWithVote: User = {
  id: '1234',
  vote: {
    date: new Date(),
    restaurantId: '123',
    restaurantName: 'test',
  },
};

const useridDTO: UserIdDTO = {
  id: '1234',
};
