import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-BLEconnect',
  templateUrl: 'BLEconnect.html'
})
export class BLEconnectPage {

  unpairedDevices: any = [];
  pairedDevices: any = [];
  gettingDevices: Boolean;
  constructor(private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController) {
    bluetoothSerial.enable();
  }

  
  startScanning() {
    this.pairedDevices = [];
    this.unpairedDevices = [];
    this.gettingDevices = true;
    //this.bluetoothSerial.setDeviceDiscoveredListener();
    
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      this.unpairedDevices = success;
      this.gettingDevices = false;
      success.forEach(element => {
        // alert(element.name);
      });
    },
      (err) => {
        console.log(err);
      })

    this.bluetoothSerial.list().then((success) => {
      this.unpairedDevices = success;
      this.gettingDevices = false;
    },
      (err) => {

      })
  }

  success = (data) => console.log(data);
  fail = (error) => console.log(error);

  selectDevice(address: any, i: any, device: any) {
    let alert = this.alertCtrl.create({
      title: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: () => {
                this.bluetoothSerial.connect(address).subscribe((res) => {
                    let connected = this.alertCtrl.create({
                        title: 'Connected',
                        message: 'You have been connected successfully!',
                        buttons: [{
                          text: 'Ok',
                          role: 'cancel',
                          handler: () => {
                                
                           }
                        }]
                    }).present();
                    });
                }
              }]
            });
        alert.present();
      }
      
  
  disconnect(i: any) {
    let alert = this.alertCtrl.create({
      title: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
           // let device = this.pairedDevices.indexOf(i);
           // this.unpairedDevices.push(device);
           // this.pairedDevices.splice(i, 1);
          }
        }
      ]
    });
    alert.present();
  }
}


