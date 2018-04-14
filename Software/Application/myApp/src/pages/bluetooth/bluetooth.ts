import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { DeviceProvider } from '../../providers/device/device';

//const ANGLE_SERVICE = '1800'
//const ANGLE_CHARACTERISTIC = '1801';

@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
})
export class BluetoothPage {

  peripheral: any = {};
  statusMessage: string;
  angle: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
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
      
      /*this.ble.startNotification(this.peripheral.id, ANGLE_SERVICE,ANGLE_CHARACTERISTIC).subscribe(
        data => this.onAngleChange(data),
        () => this.showAlert('Unexpected Error', 'Failed to subscribe for angle changes')
      )

      this.ble.read(this.peripheral.id, ANGLE_SERVICE,ANGLE_CHARACTERISTIC).then(
        data => this.onAngleChange(data),
        () => this.showAlert('Unexpected Error', 'Failed to get anle')
      )
*/
      this.viewCtrl.dismiss();
    });
  }

  /*onAngleChange(buffer:ArrayBuffer) {
    var data = new Uint8Array(buffer);
    console.log(data[0]);

    this.ngZone.run(() => {
      this.angle = data[0];
    });
  }
*/

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  onDeviceDisconnected(peripheral) {
    let toast = this.toastCtrl.create({
      message: 'The peripheral unexpectedly disconnected',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

}