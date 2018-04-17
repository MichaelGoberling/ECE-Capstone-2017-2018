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
  sessionStart: boolean;
  watch: any;
  quality: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public deviceSerive: DeviceProvider, public tableDataProvider: TableDataProvider, public bluetoothSerial: BluetoothSerial) {
    this.sessionStart = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubSelectPage');
  }
  addData(){
    let obj = {
      angle: this.angle,
      distance: this.distance,
      club: this.club,
      quality: this.quality
    }
  this.tableDataProvider.setTable(obj);
  }

startSession(){
  this.sessionStart = !this.sessionStart;
  if (this.sessionStart === true){
  this.watch = this.bluetoothSerial.subscribe(":").subscribe((RES) => {
    this.angle = RES.replace(":", "");
   //console.log(this.angle);
   // this.bluetoothSerial.subscribe("!").subscribe((qualRes) => {
     // let num = qualRes.replace("!", "");
    
     if(this.angle.indexOf("x") === -1) {
        this.quality = ":thumbsdown:";
        this.angle =this.angle.replace("y","");
        console.log("replaced y");
        console.log(this.angle);
        this.addData();
      } else {
        this.quality = ":thumbsup:";
        this.angle.replace("x","");
        this.addData();
      }
    });
} else{
    this.watch.unsubscribe();
  }
}

}
