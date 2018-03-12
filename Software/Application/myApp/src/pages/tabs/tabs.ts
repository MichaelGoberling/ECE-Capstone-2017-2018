import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ClubSelectPage } from '../club-select/club-select';
//import {BluetoothHandler} from '../home/home';
//The above is not needed because we do not export bluetoothhandler on the home page
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ClubSelectPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
