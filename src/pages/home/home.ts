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

  constructor(public navCtrl: NavController, private datePicker: DatePicker) {

  }

  onSetDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      
    }).then(
      date => {
        console.log('Got date: ', date);
        this.date = date;
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

}
