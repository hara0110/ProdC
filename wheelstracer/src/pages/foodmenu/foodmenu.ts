import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
//import { AngularFireAuth } from 'angularfire2/auth';

//import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';


import { IonicPage, NavController, NavParams  } from 'ionic-angular';
//import {ViewController  } from 'ionic-angular';
import { PopoverPage } from '../about-popover/about-popover';
import {CartService} from '../../providers/cart.service';
import {AuthService} from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { UserData } from '../../providers/user-data';



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
                    this.navCtrl.setRoot("LoginPage")
                  }
                }
              else{
                navCtrl.push(LoginPage);
              }
          }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodmenuPage');
  }

  ionViewCanEnter(){
   if(this.afAuth.authenticated){
     return true;
   }
   else{
     this.navCtrl.push(LoginPage);
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

}
