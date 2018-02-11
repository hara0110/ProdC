import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

import { PopoverPage } from '../about-popover/about-popover';


/**
 * Generated class for the FoodmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-foodmenu',
  templateUrl: 'foodmenu.html',
})
export class FoodmenuPage {

  currentDate:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public popoverCtrl: PopoverController) {
    this.currentDate =new Date().toJSON().split('T')[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodmenuPage');
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  presentFilter()
  {
    console.log("Veg / Non Veg");
  }

}
