import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {CartService} from '../../providers/cart.service';
import {AuthService} from '../../providers/auth-service';
import { CheckoutPage } from '../checkout/checkout';

//import {BillingPage} from '../billing/billing';

/**
 * Generated class for the UsercartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usercart',
  templateUrl: 'usercart.html',
})
export class UsercartPage {
  cart: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public authService: AuthService
   ) {
cartService.loadCartList(this.authService.getLoggedInUserId());
this.cart = this.cartService.cartItems;
}

ionViewDidLoad() {
}



increment(item : any) : void {
 this.cartService.incrementCartItem(this.authService.getLoggedInUserId(),item);
}
decrement(item : any) : void {
this.cartService.decrementCartItem(this.authService.getLoggedInUserId(),item);
} 
remove(item : any) : void {
this.cartService.removeCartItem(this.authService.getLoggedInUserId(),item.$key);
}

checkout() : void {
this.navCtrl.push(CheckoutPage);
}

goBack() {
this.navCtrl.pop();
}

}
