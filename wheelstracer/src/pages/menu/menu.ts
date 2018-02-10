import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { AboutPage } from '../about/about';
import { AccountPage } from '../account/account';
//import { LoginPage } from '../login/login';
import { MapPage } from '../map/map';
//import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs-page/tabs-page';
import { TutorialPage } from '../tutorial/tutorial';
import { SchedulePage } from '../schedule/schedule';
import { SpeakerListPage } from '../speaker-list/speaker-list';
import { SupportPage } from '../support/support';

import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

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
    { title: 'Schedule', name: 'TabsPage', component: TabsPage, tabComponent: SchedulePage, index: 0, icon: 'calendar' },
    { title: 'Speakers', name: 'TabsPage', component: TabsPage, tabComponent: SpeakerListPage, index: 1, icon: 'contacts' },
    { title: 'Map', name: 'TabsPage', component: TabsPage, tabComponent: MapPage, index: 2, icon: 'map' },
    { title: 'About', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 3, icon: 'information-circle' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Account', name: 'AccountPage', component: AccountPage, icon: 'person' },
    { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    { title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true }
  ];
 
  public rootPage = "TabsPage";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public confData: ConferenceData,
              public events: Events,
              public userData: UserData,
              public menu: MenuController,
              public platform: Platform,              
              public storage: Storage,
              public splashScreen: SplashScreen
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
      this.navCtrl.setRoot("LoginPage");
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }


  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

}
