import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit {
  
  username;

  constructor(public navCtrl: NavController, private authService: AuthServiceProvider) {

  }

  ngOnInit(): void {
    this.username = this.authService.getUser().firstName;
  }

}
