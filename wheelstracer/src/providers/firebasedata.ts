import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';



@Injectable()
export class FirebaseData {
  public userDBRef =firebase.database().ref("users");
    

  constructor(
    public events: Events,
    public storage: Storage,
    public  afAuth: AngularFireAuth,
    public firebasedb :AngularFireDatabase
    ) 
  {
    
    
  }

  public  getUserDb =function() {
   
    return this.userDBRef;
    
  }

  public getDbRoot=function () {
    return firebase.database();
  }

 
}
