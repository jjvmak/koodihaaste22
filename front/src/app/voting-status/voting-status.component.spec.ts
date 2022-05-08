import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VotingService } from '../services/voting.service';

import { VotingStatusComponent } from './voting-status.component';

describe('VotingStatusComponent', () => {
  let component: VotingStatusComponent;
  let votingServiceSpy: jasmine.SpyObj<VotingService>;

  beforeEach(async () => {
    votingServiceSpy = jasmine.createSpyObj<VotingService>(['getResults']);
    component = new VotingStatusComponent(votingServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
