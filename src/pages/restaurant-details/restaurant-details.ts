import { TabsPage } from './../tabs/tabs';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RestaurantDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurant-details',
  templateUrl: 'restaurant-details.html',
})
export class RestaurantDetailsPage implements OnInit {

  restaurant;
  request;
  availableTables: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private restaurantService: RestaurantProvider) {
  }

  ngOnInit() {
    this.restaurant = this.navParams.get('restaurant');
    this.request = this.navParams.get('request');
    this.getAvailableTables();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantDetailsPage');
    this.getAvailableTables();
  }

  getAvailableTables() {
    console.log('Getting tables');
    this.restaurantService.getAvailableSlots(this.request.date, this.restaurant.id, this.request.guests).subscribe(
      data => 
        { 
          let temp = data.json();
          temp.forEach(element => {
            element.reservationDate = new Date(element.reservationDate);
          });
          this.availableTables = temp;
          console.log(data.json());
        },
      error => console.log(error)
    );
  }

  onReserveTable(table) {
    this.restaurantService.makeReservation(table.reservationDate, table.restaurantTable.restaurantId, table.restaurantTable.id).
    subscribe(
      data => {
        console.log(data);
        this.getAvailableTables();
        this.navCtrl.parent.select(1);
      }
    );
  }
}
