import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DeviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeviceProvider {

  currentDevice: any;

  constructor(public http: HttpClient) {
    console.log('Hello DeviceProvider Provider');
  }

  setDevice(device){
    this.currentDevice = device;
  }
  getDevice(){
    return this.currentDevice;
  }
}
