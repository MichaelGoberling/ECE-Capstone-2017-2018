import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TablePage } from '../pages/table/table';
import { BLEconnectPage } from '../pages/BLEconnect/BLEconnect';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BLE } from '@ionic-native/ble';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { ClubSelectPage } from '../pages/club-select/club-select';
import { DeviceProvider } from '../providers/device/device';
import { TableDataProvider } from '../providers/table-data/table-data';
import { NativeStorage } from '@ionic-native/native-storage';
import { EmojiPickerModule } from '@ionic-tools/emoji-picker';


//Whenever you want to make new pages they need to go into here as well
@NgModule({
  declarations: [
    MyApp,
    TablePage,
    BLEconnectPage,
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
    TablePage,
    BLEconnectPage,
    TabsPage,
    BluetoothPage,
    ClubSelectPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BLE,
    BluetoothSerial,
    NativeStorage,
    DeviceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DeviceProvider,
    TableDataProvider
  ]
})
export class AppModule {}
