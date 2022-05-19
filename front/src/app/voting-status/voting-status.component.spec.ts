import { of } from 'rxjs';
import { VotingResultDTO } from '../DTOs/voting-result-dto';
import { VotingService } from '../services/voting.service';
import { TestScheduler } from 'rxjs/testing';
import { VotingStatusComponent } from './voting-status.component';

describe('VotingStatusComponent', () => {
  let component: VotingStatusComponent;
  let votingServiceSpy: jasmine.SpyObj<VotingService>;
  let scheluder: TestScheduler;

  beforeEach(async () => {
    scheluder = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    votingServiceSpy = jasmine.createSpyObj<VotingService>(['getResults']);
    component = new VotingStatusComponent(votingServiceSpy);

    votingServiceSpy.getResults.and.returnValue(of(votingResults));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

const votingResults: VotingResultDTO = {
  date: '2022-01-01',
  results: [
    {
      city: 'testi-city-1',
      name: 'ravinteli-1',
      restaurantId: '111',
      votes: 1,
    },
    {
      city: 'testi-city-1',
      name: 'ravinteli-2',
      restaurantId: '222',
      votes: 18,
    },
    {
      city: 'testi-city-1',
      name: 'ravinteli-3',
      restaurantId: '333',
      votes: 3,
    },
  ],
};
