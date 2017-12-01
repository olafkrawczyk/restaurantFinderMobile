import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

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
  email;
  password;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthServiceProvider, public toastCtrl: ToastController) {
    this.navigateToTabs();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin() {
    this.authService.loginClient(this.email, this.password).subscribe(
      (token) => {
        this.authService.getUserData().subscribe(
          (data) => {
            this.logged = true;
            this.navigateToTabs();
          },
          error => this.presentToast()
        );
      },
      error => this.presentToast()
    );
  }

  navigateToTabs() {
    if (this.logged === true) {
      this.navCtrl.setRoot(TabsPage);
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Login error. Please chcek your credentials',
      duration: 5000
    });
    toast.present();
  }

}
