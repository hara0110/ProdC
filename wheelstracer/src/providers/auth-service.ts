import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
 
@Injectable()
export class AuthService {
 
  private isLoggedIn = false;
 
  constructor(public afAuth:AngularFireAuth) {
   
    afAuth.auth.onAuthStateChanged(function(user) {
      if (user) {
       this.isLoggedIn=true;
      } else {
        this.isLoggedIn=false;
      }
    })

  }
 
  // Login a user
  // Normally make a server request and store
  // e.g. the auth token
  login() : void {
    this.isLoggedIn = true;
  }
 
  // Logout a user, destroy token and remove
  // every information related to a user
  logout() : void {
    this.afAuth.auth.signOut().then(function() {
      console.log("User Logged Out");
    }, function() {
      // An error happened.
    });
    this.isLoggedIn = false;
  }
 
  // Returns whether the user is currently authenticated
  // Could check if current token is still valid
  authenticated() : boolean {
    console.log( this.isLoggedIn);
      return this.isLoggedIn;
  }
}