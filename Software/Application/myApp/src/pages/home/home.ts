import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
 
  }
  handler(){
    console.log("Button was clicked");
  }
 
}
export class BluetoothHandler {
  constructor(private ble: BLE) { 

    console.log("Button was pressed");
  }

  
}
