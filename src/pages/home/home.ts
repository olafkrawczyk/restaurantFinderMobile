import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  city: string;
  guests: number;
  cuisine: string;
  date: Date;

  constructor(public navCtrl: NavController, private datePicker: DatePicker, private restaurantService: RestaurantProvider) {

  }


  onFindRestaurants() {
    console.log(this.date);
    this.restaurantService.getRestaurantsByParams(this.city, this.guests, this.date, this.cuisine).subscribe(
      data => console.log(data)
    );
  }

}
