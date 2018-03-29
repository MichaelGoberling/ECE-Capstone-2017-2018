import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TableDataProvider } from '../../providers/table-data/table-data';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  data: any[] = [];
  Club:any;


  constructor(public navCtrl: NavController, public tableDataProvider: TableDataProvider) {
    
    this.data = this.tableDataProvider.getTable();
    this.data.reverse();

  }
  filter() {
   this.data = this.data.filter(
            item => item.club === this.Club);
 }
}
