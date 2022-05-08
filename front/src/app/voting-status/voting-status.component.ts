import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { RestaurantVotesDTO } from '../DTOs/restaurant-votes-dto';
import { VotingService } from '../services/voting.service';

@Component({
  selector: 'app-voting-status',
  templateUrl: './voting-status.component.html',
  styleUrls: ['./voting-status.component.scss'],
})
export class VotingStatusComponent implements OnInit {
  restaurantVotes$: Observable<RestaurantVotesDTO[]>;

  constructor(private votingService: VotingService) {
    this.restaurantVotes$ = interval(1000).pipe(
      mergeMap(() => this.votingService.getResults()),
      map((value) => value.results),
      map((value) => value.sort((a, b) => b.votes - a.votes)),
      distinctUntilChanged((prev, cur) => {
        return JSON.stringify(prev) === JSON.stringify(cur);
      })
    );
  }

  ngOnInit(): void {}
}
