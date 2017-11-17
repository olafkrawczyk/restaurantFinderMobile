import { baseURL } from './../../app/app.component';
import { AuthServiceProvider } from './../auth-service/auth-service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/RX';

/*
  Generated class for the RestaurantProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestaurantProvider {

  constructor(public http: Http, private authService: AuthServiceProvider) {
    console.log('Hello RestaurantProvider Provider');
  }

  getRestaurantsByParams(city, people, date, cuisine) {
    console.log(this.authService.getHeaders());
    return this.http.post(baseURL + 'restaurants/findByParameters',
      { city: city, people: people, date: date, cuisine: cuisine }, { headers: this.authService.getHeaders() }).
      map(data => data.json());
  }

  getCuisines() {
    return this.http.get(baseURL + 'availableCuisines');
  }

  getCities() {
    return this.http.get(baseURL + 'restaurantsCities');
  }

  getReservations() {
    let id = this.authService.getUser().id;
    return this.http.get(baseURL + 'reservations/client/' + id, { headers: this.authService.getHeaders() });
  }

  cancelReservation(id: number) {
    const params = new URLSearchParams();
    params.append('reservationId', id.toString());
    return this.http.post(baseURL + 'reservations/cancel', { restaurantId: id }, { params: params, headers: this.authService.getHeaders() });
  }

  getAvailableSlots(date: Date, restaurantId, seats) {
    const params = new URLSearchParams();

    params.append('seats', String(seats));
    params.append('restaurantId', String(restaurantId));
    params.append('date', date.toISOString());

    return this.http.get(baseURL + 'reservations/availableSlots', { params: params, headers: this.authService.getHeaders() });
  }

  makeReservation(date: Date, restauranId: number, tableId: number) {
    const user = this.authService.getUser();
    return this.http.post(baseURL + 'reservations/makeReservation',
      {
        reservationDateISO: date.toISOString(), restaurantId: restauranId,
        tableId: tableId, clientEmailAddress: user.emailAddress
      }, { headers: this.authService.getHeaders() });
  }
}
