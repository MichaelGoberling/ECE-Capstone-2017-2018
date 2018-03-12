import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { DeviceProvider } from '../../providers/device/device';


@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
})
export class BluetoothPage {

  peripheral: any = {};
  statusMessage: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController,
              public deviceService: DeviceProvider,
              private ble: BLE,
              private toastCtrl: ToastController,
              private ngZone: NgZone) {

    let device = navParams.get('device');

    this.setStatus('Connecting to ' + device.name || device.id);

    this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.onDeviceDisconnected(peripheral)
    );
  }

  onConnected(peripheral) {
    this.ngZone.run(() => {
      this.setStatus('');
      this.peripheral = peripheral;
      this.deviceService.setDevice(peripheral.id);
      this.viewCtrl.dismiss();
    });
  }

  onDeviceDisconnected(peripheral) {
    let toast = this.toastCtrl.create({
      message: 'The peripheral unexpectedly disconnected',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  // Disconnect peripheral when leaving the page
  //ionViewWillLeave() {
  //  console.log('ionViewWillLeave disconnecting Bluetooth');
 //   this.ble.disconnect(this.peripheral.id).then(
   //   () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
     // () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
   // )
  //}

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

}