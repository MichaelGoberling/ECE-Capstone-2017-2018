import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeviceProvider } from '../../providers/device/device';
import { TableDataProvider } from '../../providers/table-data/table-data';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';



@IonicPage()
@Component({
  selector: 'page-club-select',
  templateUrl: 'club-select.html',
})
export class ClubSelectPage {
  club: any;
  angle: any;
  distance: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, public deviceSerive: DeviceProvider, public tableDataProvider: TableDataProvider, public bluetoothSerial: BluetoothSerial) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubSelectPage');
  }
  addData(){
    let obj = {
      angle: this.angle,
      distance: this.distance,
      club: this.club
    }
  this.tableDataProvider.setTable(obj);
  }

  findAngle()
  {
  this.bluetoothSerial.subscribeRawData().subscribe((RES) => {
    this.angle = RES;
    console.log(RES);
  });
  }
}
