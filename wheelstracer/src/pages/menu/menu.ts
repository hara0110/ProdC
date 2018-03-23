import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { AboutPage } from '../about/about';
import { AccountPage } from '../account/account';
import { MapPage } from '../map/map';
import { TabsPage } from '../tabs-page/tabs-page';
import { TutorialPage } from '../tutorial/tutorial';
import { SupportPage } from '../support/support';

import {AngularFireAuth} from 'angularfire2/auth';

import {FirebaseData} from '../../providers/firebasedata';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import {AuthService} from '../../providers/auth-service';
import { FoodmenuPage } from '../foodmenu/foodmenu';
import { RegionalfoodPage } from '../regionalfood/regionalfood';


export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@IonicPage()
@Component({
  selector: 'menu-page',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav)
  public nav: Nav;

  appPages: PageInterface[] = [
    { title: 'Select Your Menu', name: 'TabsPage', component: TabsPage, tabComponent: FoodmenuPage, index: 0, icon: 'menu' },
    // { title: 'Todays Special', name: 'TabsPage', component: TabsPage, tabComponent: SchedulePage, index: 1, icon: 'calendar' },
    { title: 'Regional Food', name: 'TabsPage', component: TabsPage, tabComponent: RegionalfoodPage, index: 1, icon: 'contacts' },
    { title: 'Track Order', name: 'TabsPage', component: TabsPage, tabComponent: MapPage, index: 2, icon: 'map' },
    { title: 'Support', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 3, icon: 'information-circle' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Account', name: 'AccountPage', component: AccountPage, icon: 'person' },
    { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    { title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true }
  ];
 
  public rootPage = "TabsPage";

  ionViewCanEnter(){
    
      return this.authServe.authenticated;
   }
   username: string;
   baseUserData  = { displayName:"" ,email:"",photoUrl:"",password:""};

   ngAfterViewInit() {  
    this.getUsername();
    this.setBaseUserData();  
 } 

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public confData: ConferenceData,
              public firebasedb: FirebaseData,
              public  afAuth: AngularFireAuth,
              public events: Events,
              public userData: UserData,
              public menu: MenuController,
              public platform: Platform,              
              public storage: Storage,
              public splashScreen: SplashScreen,
              public authServe:AuthService,
            ) {
    confData.load();
    this.menu.enable(true);
    this.menu.swipeEnable(true);
  }

  ionViewDidLoad() {
    console.log(this.menu.isEnabled());
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.userData.logout();
      this.storage.set("userid","no");
      this.navCtrl.setRoot("LoginPage");
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
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
     userProfileDb.on('value',function() {
      
      // this.baseUserData.photoUrl=snapshot.val().photoUrl;
      // this.baseUserData.email=snapshot.val().email;
      // this.baseUserData.displayName=snapshot.val().displayName;
      // this.baseUserData.password=snapshot.val().password;


    });
    this.baseUserData  = this.userData.baseUserData;
  }
  else{
    console.log("User Logged Out!!");
  }
  
}

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'danger';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'danger';
    }
    return;
  }

}
