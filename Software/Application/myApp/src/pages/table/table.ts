import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TableDataProvider } from '../../providers/table-data/table-data';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'page-table',
  templateUrl: 'table.html'
})
export class TablePage {
  data: any[] = [];
  Club:any;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public tableDataProvider: TableDataProvider) {
  }

  ionViewWillEnter() {
    this.getTable();
  }
  
  remove(){
    this.tableDataProvider.clear();
    this.data = [];
  }

  //capable of filtering by club 

  //reverses the data so it shows the most recent input
  getTable() {
      this.data = this.tableDataProvider.getTable();
  }

//opens an alart box to show club and angle suggestions

}

