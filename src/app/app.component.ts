import { RestaurantProvider } from './../providers/restaurant/restaurant';
import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { LoginPage } from './../pages/login/login';
import { Component, forwardRef,  } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export const baseURL = 'https://tablersv.herokuapp.com/';

@Component({
  templateUrl: 'app.html',
  providers: [forwardRef(()=>AuthServiceProvider), forwardRef(()=>RestaurantProvider)]
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
