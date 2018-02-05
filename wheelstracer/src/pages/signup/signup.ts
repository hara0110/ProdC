import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, ToastController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs-page/tabs-page';

import {AngularFireAuth} from 'angularfire2/auth';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(private afAuth : AngularFireAuth, public toastCtrl:ToastController,
    public navCtrl: NavController, public userData: UserData ) {}




  async onSignup(form: NgForm) {
    this.submitted = true;
      
    if (form.valid) {
      try{
        let toast = this.toastCtrl.create({
          message: 'Error Signing Up',
          duration: 3000
        }); 
        this.afAuth.auth.createUserWithEmailAndPassword(this.signup.username,this.signup.password).then(
          ()=>{
            this.userData.signup(this.signup.username);
            this.navCtrl.push(TabsPage);            
          }).catch(function showError() {
             toast.present();
          });
      }
      catch(error)
      {
        let toast = this.toastCtrl.create({
          message: 'Please Check Your Creds',
          duration: 3000
        }); 
        toast.present();
      }  
      
    }
  }
}