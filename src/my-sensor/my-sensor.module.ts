import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySensorPage } from './my-sensor';
import { Chart } from 'chart.js';

@NgModule({
  declarations: [
    MySensorPage,
  ],
  imports: [
    IonicPageModule.forChild(MySensorPage),
  ],
})
export class MySensorPageModule {}
