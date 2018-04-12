
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
  }

  initGetTable() {
    alert("INITIALIZED TABLE");
    this.nativeStorage.getItem('clubTableStorage').then(() => {
      data => { 
        this.data = data.table; 
        alert("GOT DATA" + JSON.stringify(data));
      }
      error => alert(error);
    }).catch(()=>{
      console.log("error GETTING TABLE")
    })
  }

  getTable(){
    return this.data;
  }

  updateLocalStorage() {
    // this.nativeStorage.remove('clubTableStorage').then(
    //   () => console.log("Success REMOVING"),
    //   error => console.log(error)
    // )
    // .catch(()=> {
    //   console.log("err");
    // })
    this.nativeStorage.setItem('clubTableStorage', {table: this.data}).then(
      () => alert("Success" + JSON.stringify(this.data)),
      error => alert(error)
    )
    .catch(()=> {
      console.log("err");
    });
  }
}
