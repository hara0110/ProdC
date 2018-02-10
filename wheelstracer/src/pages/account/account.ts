import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import {AngularFireAuth} from 'angularfire2/auth';

import {FirebaseData} from '../../providers/firebasedata';



@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;
  baseUserData  = { displayName:"" ,email:"",photoUrl:"",password:""};

  constructor(public alertCtrl: AlertController,
              public nav: NavController,
              public userData: UserData,
              public  afAuth: AngularFireAuth,
              public firebasedb: FirebaseData
            ) {}



ngAfterViewInit() {  
   this.getUsername();
   this.setBaseUserData();  
}

updatePicture() {
  console.log('Clicked to update picture');
}

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.userData.setUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
        this.username = username;
    });
  }

  setBaseUserData(){
    var userProfileDb 
    if(this.afAuth.auth.currentUser){
     userProfileDb = this.firebasedb.getDbRoot().ref('users/' + this.afAuth.auth.currentUser.uid + '/userprofile');
    var arr= userProfileDb.on('value',function(snapshot) {
      var returnArr = [];

         snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          
          returnArr.push(item);
      });
      
      
   });

    console.log(arr);
    this.baseUserData  = this.userData.baseUserData;
  }
  else{
    console.log("User Logged Out!!");
  }
  
}

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.nav.setRoot('LoginPage');
  }

  support() {
    this.nav.push('SupportPage');
  }
}
