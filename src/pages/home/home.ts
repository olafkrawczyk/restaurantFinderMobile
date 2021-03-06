import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  city: string;
  guests: number;
  cuisine: string;
  date:any  = new Date().toISOString();

  minDate: Date;
  maxDate: Date;
  cities: string[];
  cuisines;

  restaurants: any[];

  constructor(public navCtrl: NavController, private restaurantService: RestaurantProvider) {
    this.minDate = new Date();
    this.minDate.setHours(this.minDate.getHours()+1);
    this.maxDate = moment(this.minDate).add(1, 'year').toDate();
  }

  ngOnInit() {
    this.restaurantService.getCities().subscribe(
      (data) => this.cities = data.json()
    );

    this.restaurantService.getCuisines().subscribe(
      (data) => this.cuisines = data.json()
    );
  }


  onFindRestaurants() {
    console.log('huj');
    console.log(this.date);
    
    let inputDate = new Date(this.date);
    inputDate.setMinutes(0,0);
    inputDate.setHours(inputDate.getHours()-1);
    this.date = inputDate;

    console.log(inputDate);
    this.restaurantService.getRestaurantsByParams(this.city, this.guests, inputDate.toISOString(), this.cuisine).subscribe(
      data => this.restaurants = data
    );
  }

  onRestaurantDetails(restaurant) {
    let requestData = {guests: this.guests, date: this.date.toISOString()};
    this.navCtrl.push('RestaurantDetailsPage', {request: requestData, restaurant: restaurant});
  }

}
