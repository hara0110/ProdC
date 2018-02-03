import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

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

  constructor(private afAuth:AngularFireAuth,public navCtrl: NavController, public userData: UserData) { }

 async onLogin(form: NgForm) {
    
    if (form.valid) {
   
      this.afAuth.auth.signInWithEmailAndPassword(this.login.username,this.login.password).then(
      (result)=>{
        this.submitted = true;
        this.userData.login(this.login.username);
        this.navCtrl.push(TabsPage);
      }).catch(function error() {
       console.log("Error");
    });
  }
   
      //console.log(error);
  
  else{
      console.log("ERROR!!!!!!!!!!");
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
