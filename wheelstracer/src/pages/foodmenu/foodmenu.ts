import { Component } from '@angular/core';
import { PopoverController, App } from 'ionic-angular';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
//import { AngularFireAuth } from 'angularfire2/auth';

//import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';


import { IonicPage, NavController, NavParams  } from 'ionic-angular';
//import {ViewController  } from 'ionic-angular';
import { PopoverPage } from '../about-popover/about-popover';
import {CartService} from '../../providers/cart.service';
import {AuthService} from '../../providers/auth-service';
//import { LoginPage } from '../login/login';
import { UserData } from '../../providers/user-data';
import {UsercartPage} from '../usercart/usercart';
import { LoginPage } from '../login/login';



@IonicPage()
@Component({
  selector: 'page-foodmenu',
  templateUrl: 'foodmenu.html',
})
export class FoodmenuPage {

  currentDate:any;
  products: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public productCart:CartService,
              public db: AngularFireDatabase,
              public afAuth: AuthService,
              public cartService: CartService,
              public authService: AuthService,
              public userData :UserData,
              private app :App,
            ) {
                this.currentDate =new Date().toJSON().split('T')[0];
                if(this.afAuth.authenticated){
                  try{
                  this.products = db.list('products');
                  productCart.loadCartList(this.afAuth.getLoggedInUserId());
                  console.log(afAuth.getLoggedInUserId());
                  }
                  catch(e){
                    console.log("ERROR");
                    this.userData.logout();
                    this.app.getRootNav().setRoot(LoginPage); 
                  }
                }
             
          }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodmenuPage');
  }

  ionViewCanEnter(){
   if(this.afAuth.authenticated){
     return true;
   }  
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  presentFilter()
  {
    console.log("Veg / Non Veg");
  }

  addToCart(product)  : void  {
    this.cartService.addCartItem(this.authService.getLoggedInUserId(), product);
  }

  showCart(){
    this.navCtrl.push(UsercartPage);
  }

}
