import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private logged = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    const logged = false;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin() {
    this.navigateToTabs();
  }

  navigateToTabs() {
    if (this.logged === true) {
      this.navCtrl.setRoot(TabsPage);
    }
  }

}
