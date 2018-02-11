import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodmenuPage } from './foodmenu';

@NgModule({
  declarations: [
    FoodmenuPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodmenuPage),
  ],
})
export class FoodmenuPageModule {}
