import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClubSelectPage } from './club-select';

@NgModule({
  declarations: [
    ClubSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(ClubSelectPage),
  ],
})
export class ClubSelectPageModule {}
