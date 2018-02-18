import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsercartPage } from '../usercart/usercart';

/**
 * Generated class for the RegionalfoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regionalfood',
  templateUrl: 'regionalfood.html',
})
export class RegionalfoodPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegionalfoodPage');
  }

  showCart(){
    this.navCtrl.push(UsercartPage);
  }

}
