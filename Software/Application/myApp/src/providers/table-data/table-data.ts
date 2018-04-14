
import { Injectable } from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage';

/*
  Generated class for the TableDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TableDataProvider {

  data:any[] = [];

  constructor(public nativeStorage: NativeStorage) {
    
  }

  setTable(obj:any){
    this.data.unshift(obj);
    this.updateLocalStorage();
    console.log("SET " + obj)
  }

  initGetTable() {
    this.nativeStorage.getItem('clubTableStorage').then(
      data => 
      //console.log(data.table),
      this.data = data.table,
      error => alert(error)
    );
  }

  getTable(){
    return this.data;
  }

  updateLocalStorage() {
    console.log("HERE")
    this.nativeStorage.setItem('clubTableStorage', {table: this.data}).then(
      () => console.log("Success" + JSON.stringify(this.data)),
      error => console.log(error)
    )
    .catch(()=> {
      console.log("err");
    });
  }
  clear(){
      this.data = [];
       this.nativeStorage.remove('clubTableStorage').then(
      () => console.log("Success REMOVING"),
      error => console.log(error)
    )
    .catch(()=> {
      console.log("err");
     })
  }
}
