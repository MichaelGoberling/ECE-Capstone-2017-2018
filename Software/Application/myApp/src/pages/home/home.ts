
import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  devices: any[] = [];
  statusMessage: string;

  constructor(public navCtrl: NavController, 
              private toastCtrl: ToastController,
              private ble: BLE,
              private ngZone: NgZone) { 
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.scan();
  }

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list
    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device), 
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here
  scanError(error) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

//Jacob Pilakowski
//SGS
//Comments
//JSON parses the output into a regular string, that is why we saw object Object on the output
//"this" refers to the parent scope refer to Java Scopes for more information
//Objects can have multiple valeus, think of sub functions, you can access them if you do object.

/*
import { Component,NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //any data type
  devices: any[] = [];
//suggestion to leave it to one constrcutor
 

constructor(public ngZone: NgZone, public ble: BLE, public navCtrl: NavController) { 
  }
  search(){
    console.log("Button was clicked");
    //clean list of devices when refreshed
    this.devices = [];
    //this will scan for 30 seconds
    //BLE.getPlugin(). could also do this
    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error)
      );
  }

onDeviceDiscovered(device) {
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }
scanError(err){
  console.log(err)
}

  connect(did: any) {
    this.ble.connect(did).subscribe((resp) => {
    alert(JSON.stringify(resp));
    });
  }
}
*/
}