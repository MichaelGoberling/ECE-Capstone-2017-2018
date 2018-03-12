import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BLE } from '@ionic-native/ble';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { ClubSelectPage } from '../pages/club-select/club-select';
import { DeviceProvider } from '../providers/device/device';


//Whenever you want to make new pages they need to go into here as well
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BluetoothPage,
    ClubSelectPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BluetoothPage,
    ClubSelectPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BLE,
    DeviceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DeviceProvider
  ]
})
export class AppModule {}
