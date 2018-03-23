import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';


import { IonicStorageModule } from '@ionic/storage';

import { WheelsTracerApp } from './app.component';

import {CartService} from '../providers/cart.service';
import { AboutPage } from '../pages/about/about';
import {MenuPage} from '../pages/menu/menu';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import {UsercartPage} from '../pages/usercart/usercart';
import {CheckoutPage} from '../pages/checkout/checkout';
import {SgPage} from '../pages/sg/sg';

import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import {FirebaseData} from '../providers/firebasedata';

import {AngularFireModule} from 'angularfire2';

import {AngularFireAuthModule} from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AuthService } from './../providers/auth-service';
import { FoodmenuPage } from '../pages/foodmenu/foodmenu';
import {SharedService} from '../providers/shared.service';
import {CustomerService} from '../providers/customer-service';
import { RegionalfoodPage } from '../pages/regionalfood/regionalfood';
import { AdminPage } from '../pages/admin/admin';
import { UploadServiceProvider } from '../providers/upload-service';

@NgModule({
  declarations: [
    WheelsTracerApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    MenuPage,
    SupportPage,
    FoodmenuPage,
    UsercartPage,
    CheckoutPage,
    RegionalfoodPage,
    AdminPage,
    SgPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(WheelsTracerApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: SpeakerListPage, name: 'SpeakerList', segment: 'speakerList' },
        { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: MenuPage, name: 'MenuPage', segment: 'menu-page' },
        { component: FoodmenuPage, name: 'FoodmenuPage', segment: 'page-foodmenu' },
        { component: SgPage, name: 'SgPage', segment: 'page-sg' },
        
      ]
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp({        
      apiKey: "AIzaSyCh1cfMhiPsHczRM9mPvzOUBKC42jhwEIQ",
      authDomain: "prodc-da2cd.firebaseapp.com",
      databaseURL: "https://prodc-da2cd.firebaseio.com",
      projectId: "prodc-da2cd",
      storageBucket: "prodc-da2cd.appspot.com",
      messagingSenderId: "771410076911"
    }),
    AngularFireAuthModule,   
    AngularFireDatabaseModule, 
       
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    WheelsTracerApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    MenuPage,
    FoodmenuPage, 
    UsercartPage,
    CheckoutPage,
    RegionalfoodPage, 
    AdminPage, 
    SgPage,
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    StatusBar,
    Facebook,
    FirebaseData,
    AuthService,
    CartService,
    AngularFireDatabase,
    SharedService,
    CustomerService,
    UploadServiceProvider,
    UploadServiceProvider
    ]
})
export class AppModule { }
