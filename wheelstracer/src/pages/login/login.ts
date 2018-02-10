import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import {  MenuController  } from 'ionic-angular';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
//import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';
import {MenuPage} from '../menu/menu';

//Custom Add
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import {Platform} from 'ionic-angular';

import {AuthService} from '../../providers/auth-service';




@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  facebookUserData :any;

  constructor(private afAuth:AngularFireAuth,
              public toastCtrl: ToastController,
              public facebook:Facebook,
              public navCtrl: NavController,
              public userData: UserData,
              public alertCtrl: AlertController,
              public plt: Platform,
              public authServe:AuthService,
              public menu : MenuController,
             
  ) { 
    this.navCtrl = navCtrl;
    this.userData = userData;
    this.submitted = false;    
    this.menu = menu;
  }

  // onPageDidEnter() {
  //   // the left menu should be disabled on the login page
  //   this.menu.enable(false);
  //   this.menu.swipeEnable(false);
  // }

  // onPageDidLeave() {
  //   // enable the left menu when leaving the login page
  //   this.menu.enable(true);
  //   this.menu.swipeEnable(true);
  // }
  

 
 async onLogin(form: NgForm) {    
    if (form.valid) {
    try{
      let toast = this.toastCtrl.create({message: 'Please Check Your Creds', duration: 3000});
      this.afAuth.auth.signInWithEmailAndPassword(this.login.username,this.login.password).then(
        ()=>{
          this.submitted = true;
         // this.userData.login(this.login.username);         
          this.authServe.login();
          this.navCtrl.push(MenuPage);
        }).catch(function error() {      
        console.log("Error");      
        toast.present();
        });
  }
  catch(e)
  {
    let toast = this.toastCtrl.create({
      message: 'Something Went Wrong!',
      duration: 3000
    });
    toast.present();
    }
  }  //console.log(error);
  
  else{
      console.log("ERROR!!!!!!!!!!");
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }


  facebookLogin(){
    //check Platform
      if (this.plt.is('core')||this.plt.is('mobileweb')) {
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
      res=>{
      this.submitted = true;
      this.authServe.login();
      this.userData.loginFromFacebook(res);
      this.navCtrl.setRoot("MenuPage");
     }
   )
    
   }  
  else{
    console.log();
  }
  
  }
}
 