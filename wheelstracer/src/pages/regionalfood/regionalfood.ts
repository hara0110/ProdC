import { Component } from '@angular/core';
import { PopoverController, App } from 'ionic-angular';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';

import {CartService} from '../../providers/cart.service';
import {AuthService} from '../../providers/auth-service';
import { UserData } from '../../providers/user-data';
import {UsercartPage} from '../usercart/usercart';
import { LoginPage } from '../login/login';
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

  foodImagesRef1:string="https://firebasestorage.googleapis.com/v0/b/prodc-da2cd.appspot.com/o/assets%2Fimg%2F";
  foodImagesRef2:string="?alt=media&token=8fd21811-2b5d-41be-b09e-462a963406a8";

  currentDate:any;
  vOdishaThali: FirebaseListObservable<any[]>;
  nvOdishaThali: FirebaseListObservable<any[]>;
  vNorthIndianThali :FirebaseListObservable<any[]>;
  nvNorthIndianThali:  FirebaseListObservable<any[]>;
  vStaple: any;
  stapleLoader:FirebaseListObservable<any[]>;
  curryLoader:FirebaseListObservable<any[]>;
  eatTypes() : string[]{
    return [
      "Veg", "Non-Veg", "Veg/Non-Veg"
    ];
  } 
  eatType: string = "Veg/Non-Veg";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public productCart:CartService,
              public db: AngularFireDatabase,
              public afAuth: AuthService,
              public cartService: CartService,
              public authService: AuthService,
              public userData :UserData,
              private app :App,) {

                if(this.afAuth.authenticated){
                  try{
                  this.vOdishaThali =  db.list('/food/veg/Regional/Odisha'); 
                  this.nvOdishaThali =  db.list('/food/nonveg/Regional/Odisha'); 
                  this.vNorthIndianThali =  db.list('/food/veg/Regional/North_Indian'); 
                  this.nvNorthIndianThali =  db.list('/food/nonveg/Regional/North_Indian');
                  productCart.loadCartList(this.afAuth.getLoggedInUserId());
                }
                  catch(e){
                    console.log("ERROR"+ e);
                    this.userData.logout();
                    this.app.getRootNav().setRoot(LoginPage); 
                  }
                }             
  }
 
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegionalfoodPage');
  }

  showCart(){
    this.navCtrl.push(UsercartPage);
  }

}
