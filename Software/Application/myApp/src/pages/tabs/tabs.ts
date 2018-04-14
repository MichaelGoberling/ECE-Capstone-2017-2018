import { Component } from '@angular/core';
import { TablePage } from '../table/table';
import { BLEconnectPage } from '../BLEconnect/BLEconnect';
import { ClubSelectPage } from '../club-select/club-select';
//import {BluetoothHandler} from '../home/home';
//The above is not needed because we do not export bluetoothhandler on the home page
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BLEconnectPage;
  tab2Root = ClubSelectPage;
  tab3Root = TablePage;

  constructor() {

  }
}
