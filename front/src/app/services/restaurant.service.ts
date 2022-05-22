import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestaurantResponseDTO } from '../DTOs/restaurant-response-dto';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  url = `${environment.apiPath}restaurants/`;

  constructor(private http: HttpClient) {}

  getRestaurants(city: string): Observable<RestaurantResponseDTO> {
    if (city === '') {
      return of(missing);
    }
    return this.http.get<RestaurantResponseDTO>(`${this.url}${city}`).pipe(
      catchError((err) => {
        if (err.status === 404) {
          return of(missing);
        } else {
          return throwError(err);
        }
      })
    );
  }
}

const missing: RestaurantResponseDTO = {
  alreadyVoted: '',
  date: '',
  restaurants: [],
};
