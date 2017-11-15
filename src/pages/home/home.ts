import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
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

  constructor(public navCtrl: NavController, private datePicker: DatePicker, private restaurantService: RestaurantProvider) {
    this.minDate = new Date();
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
    console.log(moment(this.date));
    this.restaurantService.getRestaurantsByParams(this.city, this.guests, this.date, this.cuisine).subscribe(
      data => this.restaurants = data
    );
  }

}
