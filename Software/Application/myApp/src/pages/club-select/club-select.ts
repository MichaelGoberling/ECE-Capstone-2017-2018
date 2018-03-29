import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { DeviceProvider } from '../../providers/device/device';
import { TableDataProvider } from '../../providers/table-data/table-data';


/**
 * Generated class for the ClubSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-club-select',
  templateUrl: 'club-select.html',
})
export class ClubSelectPage {
  club: any;
  angle: any;
  distance: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, public deviceSerive: DeviceProvider, public tableDataProvider: TableDataProvider) {
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


  //getAngle(){ //STILL WORKING ON THIS 
  // let device = this.deviceSerive.getDevice;
  // if this.BLE.isConnected(device);
  //  this.angle
 // }

}
