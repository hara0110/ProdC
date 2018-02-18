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
//import * as firebase from 'firebase';


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
  // vStaple:FirebaseListObservable<any[]>;
  vStaple: any;
  stapleLoader:FirebaseListObservable<any[]>;
  curryLoader:FirebaseListObservable<any[]>;
  eatTypes() : string[]{
    return [
      "Veg", "Non-Veg", "Veg/Non-Veg"
    ];
  } 
  eatType: string = "Veg/Non-Veg";
  //foodImagesRef:string="";
  foodImagesRef1:string="https://firebasestorage.googleapis.com/v0/b/prodc-da2cd.appspot.com/o/assets%2Fimg%2F";
  foodImagesRef2:string="?alt=media&token=8fd21811-2b5d-41be-b09e-462a963406a8";
  
  
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
                // firebase.storage().ref("/assets/img/").getDownloadURL().then((url)=>{
                //   this.foodImagesRef=url;
                //   console.log(this.foodImagesRef);
                // });                
                if(this.afAuth.authenticated){
                  try{
                  this.nvCurry =  db.list('/food/nonveg/curry'); 
                  this.vCurry =  db.list('/food/veg/curry'); 
                  this.nvStaple =  db.list('/food/nonveg/staples'); 
                  this.vStaple =  db.list('food/veg/staples');
                  //this.eatType="Veg/Non-Veg";
                  productCart.loadCartList(this.afAuth.getLoggedInUserId());
                }
                  catch(e){
                    console.log("ERROR"+ e);
                    this.userData.logout();
                    this.app.getRootNav().setRoot(LoginPage); 
                  }
                }                
          }

  onVegChange(newValue){
    this.eatType=newValue;
    console.log(newValue);
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
