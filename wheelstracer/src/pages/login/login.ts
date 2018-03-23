import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import {  MenuController  } from 'ionic-angular';
import { AlertController, NavController, ToastController,LoadingController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
//import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';
import {MenuPage} from '../menu/menu';

//Custom Add
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

import {Platform} from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import {AuthService} from '../../providers/auth-service';
import { AdminPage } from '../admin/admin';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  facebookUserData :any;
  isCorePlatform=false;
  splash = true;
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  constructor(private afAuth:AngularFireAuth,
              public toastCtrl: ToastController,
              public facebook:Facebook,
              public navCtrl: NavController,
              public userData: UserData,
              public alertCtrl: AlertController,
              public plt: Platform,
              public authServe:AuthService,
              public menu : MenuController,
              public loadingCtrl: LoadingController,
              private fb:Facebook,
              public storage:Storage

  ) { 
    if (this.plt.is('core')){
      this.isCorePlatform=true;
    }
    
    
    this.navCtrl = navCtrl;
    this.userData = userData;
   // this.submitted = false;    
    this.menu = menu;
  }
 
  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 4000);
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    
  }
  ionViewDidEnter(){
   this.storage.get('userid').then(
     (res)=>{
       if(res=="yes")
       this.navCtrl.setRoot(MenuPage)}
   );
  }
  phoneLogin(phoneNumber: number){
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+91" + phoneNumber;
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then( confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        let prompt = this.alertCtrl.create({
        title: 'Enter the Confirmation code',
        inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
        buttons: [
          { text: 'Cancel',
            handler: data => { console.log('Cancel clicked'+data); }
          },
          { text: 'Send',
            handler: data => {
              confirmationResult.confirm(data.confirmationCode)
              .then( (result)=> {
                 
                this.submitted = true;
                this.authServe.login();
                console.log(result.user);
                this.userData.loginFromMobile(result.user);
                let loading = this.loadingCtrl.create({
                  content: `Please Wait`,
                  duration: (Math.random() * 1000) + 500
                });
                loading.onWillDismiss(() => {
                  this.navCtrl.setRoot("MenuPage");
                });
                loading.present();
              }).catch((error) =>{
                console.log(error);
                // User couldn't sign in (bad verification code?)
                // ...
                let toast = this.toastCtrl.create({
                  message: 'Something Went Wrong!',
                  duration: 3000
                });
                toast.present();
              });
            }
          }
        ]
      });
      prompt.present();
    })
    .catch( (error) =>{
      let toast = this.toastCtrl.create({
        message: 'Something Went Wrong!',
        duration: 3000
      });
      toast.present();
      console.log(error);
    });
  
  }

 
 async onLogin(form: NgForm) 
 {

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
      this.storage.set("userid","yes");
      this.userData.loginFromFacebook(res);
      let loading = this.loadingCtrl.create({
        content: `Please Wait`,
        duration: (Math.random() * 1000) + 500
      });
      loading.onWillDismiss(() => {
        this.navCtrl.setRoot("MenuPage");
      });
      loading.present();
      
     }
   )
    
   }  
  else{
    this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => {
    console.log('Logged into Facebook!', res);
    this.submitted = true;
    //this.authServe.login();
   // this.userData.loginFromFacebook(res);
    let toast = this.toastCtrl.create({
      message: 'logged in!',
      duration: 8000
    });
    toast.present();
   
    let loading = this.loadingCtrl.create({
      content: `Please Wait`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      this.navCtrl.setRoot("MenuPage");
    });
    loading.present();
  }
  )
  .catch(e =>{ console.log('Error logging into Facebook', e)

  let toast = this.toastCtrl.create({
    message: 'Something Went Wrong!',
    duration: 8000
  });
  toast.present();

}
    
);

  this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  } 
  }
  toAdminPage()
  {
    this.navCtrl.push(AdminPage);
  }
  
}
