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
  data:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public deviceSerive: DeviceProvider, public tableDataProvider: TableDataProvider, public bluetoothSerial: BluetoothSerial) {
    this.sessionStart = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubSelectPage');
    this.data = this.tableDataProvider.data;
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
      this.quality = String.fromCodePoint(0x1F44D);
        this.angle =this.angle.replace("y","");
        console.log("replaced y");
        console.log(this.angle);
        this.addData();
      } else {
        this.quality = String.fromCodePoint(0x1F44E);
        this.angle = this.angle.replace("x","");
        this.addData();
      }
    });
} else{
    this.watch.unsubscribe();
  }
}

getClosest(club, distance) {
            let compare = String.fromCodePoint(0x1F44D);
            let arrayOfMatches = this.data.map((item) => {
                if(item.club === club && item.quality === compare && item.angle != "") {
                   console.log("sent item");         
                  return item;
                }
            });
          
            arrayOfMatches = arrayOfMatches.filter((n) => { return n != undefined }); 
  
            console.log("AOM:" + JSON.stringify(arrayOfMatches));
            let updated = arrayOfMatches.reduce((prev, curr) => Math.abs(curr.distance - distance) < Math.abs(prev.distance - distance) ? curr : prev);
          console.log("UPDATED: " + updated);
              return updated;
            }
  
  sendAngle(){
    console.log("entered send angle");
          let item = this.getClosest(this.club,this.distance);
          this.angle = item.angle;
      console.log(item);
          this.bluetoothSerial.write(this.angle).then((success)=> {
          console.log(this.angle);
          },(failure) =>{
          //console.log("failed")
        });
        }
}


