import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';

import {FirebaseData} from '../providers/firebasedata';



@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  baseUserData  = { displayName:"" ,email:"",photoUrl:"",password:""};

  constructor(
    public events: Events,
    public storage: Storage,
    public  afAuth: AngularFireAuth,
    public firebasedb: FirebaseData 
  ) {
    
    this.baseUserData.photoUrl="http://www.gravatar.com/avatar?d=mm&s=140";
  }

  hasFavorite(sessionName: string): boolean { 
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(username: any): void {
    
    
    this.baseUserData.email=username.user.email;
    this.baseUserData.displayName="";
    this.baseUserData.photoUrl="http://www.gravatar.com/avatar?d=mm&s=140";    
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:login');
  };

  loginFromFacebook(facebookUserData:any){
    this.baseUserData.email=facebookUserData.user.email;
    this.baseUserData.displayName=facebookUserData.user.displayName;
    this.baseUserData.photoUrl=facebookUserData.user.photoURL;
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(this.baseUserData.displayName);
    this.commitBaseUserToDb();    
    this.events.publish('user:login');
  }

  signup(signup: any): void {       
    this.setUsername(signup.username);
    this.baseUserData.email=signup.username;
    this.baseUserData.displayName="Update Display Name";
    this.baseUserData.photoUrl="http://www.gravatar.com/avatar?d=mm&s=140";      
    this.baseUserData.password=signup.password;   
    this.commitBaseUserToDb();
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:login');
  };

  commitBaseUserToDb(){
    this.firebasedb.getUserDb().child(this.afAuth.auth.currentUser.uid).child("userprofile").set(
      {
        displayName: this.baseUserData.displayName,
        email: this.baseUserData.email,
        photoUrl:this.baseUserData.photoUrl,
        password:this.baseUserData.password,  
        mytest:"Hello World"  
      }
    );
  }

  logout(): void {
       
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
    
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
    
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
