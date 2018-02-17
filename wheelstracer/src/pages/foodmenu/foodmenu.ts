import { Component } from '@angular/core';
import { PopoverController, App } from 'ionic-angular';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { PopoverPage } from '../about-popover/about-popover';
import {CartService} from '../../providers/cart.service';
import {AuthService} from '../../providers/auth-service';
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
  nvCurry: FirebaseListObservable<any[]>;
  vCurry: FirebaseListObservable<any[]>;
  nvStaple: FirebaseListObservable<any[]>;
  vStaple:FirebaseListObservable<any[]>
  stapleLoader:FirebaseListObservable<any[]>;
  curryLoader:FirebaseListObservable<any[]>;
  eatType = ["Veg", "Non-Veg", "Veg/Non-Veg"];
  
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
                  this.nvCurry =  db.list('/food/nonveg/curry'); 
                  this.vCurry =  db.list('/food/veg/curry'); 
                  this.nvStaple =  db.list('/food/nonveg/staples'); 
                  this.vStaple =  db.list('food/veg/staples');   
                  this.stapleLoader=this.vStaple;

                  productCart.loadCartList(this.afAuth.getLoggedInUserId());
                }
                  catch(e){
                    console.log("ERROR");
                    this.userData.logout();
                    this.app.getRootNav().setRoot(LoginPage); 
                  }
                }
                
          }
  getVegOrNonVegStaple(){
    //this.stapleLoader= this.nvCurry;
    console.log("Filter");
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
