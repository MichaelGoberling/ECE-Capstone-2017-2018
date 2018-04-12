import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TableDataProvider } from '../../providers/table-data/table-data';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  data: any[] = [];
  Club:any;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public tableDataProvider: TableDataProvider) {

  }

  ionViewWillLoad() {
    this.data = [];
    this.getTable();
  }

  //capable of filtering by club  
  filter() {
    this.data = this.data.filter(item => item.club === this.Club);
  }

  //reverses the data so it shows the most recent input
  getTable() {
      this.data = this.tableDataProvider.getTable();
  }

  reverse() {
    this.data.reverse();
  }

  getClosest(distance) {
    return this.data.reduce((prev, curr) => Math.abs(curr.distance - distance) < Math.abs(prev.distance - distance) ? curr : prev);
  }

  promptAlert() {
    let alert = this.alertCtrl.create({
      title: "Enter Distance",
      inputs: [
        {
          name: 'distance',
          placeholder: 'Enter Distance'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log("Cancel Clicked");
          }
        },
        {
          text: 'Enter',
          handler: data => {
            if(data.distance !== '') {
              const distance = async () => {
                return await this.getClosest(data.distance);
              };
              distance().then((res) => {
                let alert = this.alertCtrl.create({
                  title: 'Club and Angle',
                  subTitle: `Club: ${res.club}, Angle: ${res.angle}`,
                  buttons: ['Dismiss']
                });
                alert.present();  
              })
            } else {
              return false;
            }
          }
        }
      ]
    }).present();
  }
}

