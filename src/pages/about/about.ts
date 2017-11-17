import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit {

  username;
  reservations;

  constructor(public navCtrl: NavController, private authService: AuthServiceProvider,
    private restaurantService: RestaurantProvider) {

  }

  ngOnInit(): void {
    this.username = this.authService.getUser().firstName;
    this.refreshReservations();
  }

  onCancelReservation(id) {
    this.restaurantService.cancelReservation(id).subscribe(
      data => {
        this.refreshReservations();
      }
    );
  }
  
  refreshReservations() {
    this.restaurantService.getReservations().subscribe(
      (data) => {
        let temp = data.json();
        temp.forEach(element => {
          element.reservationDate = new Date(element.reservationDate);
        });
        this.reservations = temp;
      },
      error => console.log(error)
    );
  }
}
