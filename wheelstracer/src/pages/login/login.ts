import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


import { AlertController, NavController, ToastController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';

import {AngularFireAuth} from 'angularfire2/auth';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(private afAuth:AngularFireAuth,
              public toastCtrl: ToastController,
              public navCtrl: NavController,
              public userData: UserData,
              public alertCtrl: AlertController,
             
  ) { }

 
 async onLogin(form: NgForm) {
    
    if (form.valid) {
    try{
      let toast = this.toastCtrl.create({
        message: 'Please Check Your Creds',
        duration: 3000
      });
      this.afAuth.auth.signInWithEmailAndPassword(this.login.username,this.login.password).then(
        ()=>{
          this.submitted = true;
          this.userData.login(this.login.username);
          this.navCtrl.push(TabsPage);
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
}
