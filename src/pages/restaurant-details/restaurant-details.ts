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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.restaurant = this.navParams.get('restaurant');
    this.request = this.navParams.get('request')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantDetailsPage');
  }

}
