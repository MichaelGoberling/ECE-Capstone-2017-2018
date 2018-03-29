
import { Injectable } from '@angular/core';

/*
  Generated class for the TableDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TableDataProvider {

  data:any[] = [];

  constructor() {
    console.log('Hello TableDataProvider Provider');
  }
  setTable(obj:any){
    this.data.push(obj);
  }
  getTable(){
    return this.data;
  }

}
