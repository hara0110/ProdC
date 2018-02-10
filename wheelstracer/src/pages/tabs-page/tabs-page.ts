import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';


import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { SpeakerListPage } from '../speaker-list/speaker-list';
import { AuthService } from '../../providers/auth-service';

import {  NavController } from 'ionic-angular';


@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = SchedulePage;
  tab2Root: any = SpeakerListPage;
  tab3Root: any = MapPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams , public authServe:AuthService ,public navCtrl :NavController) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

  // ionViewCanEnter() {
  //   if(this.authServe.authenticated())
  //   {
  //      return this.authServe.authenticated();
  //   }
  //   else{
  //        console.log("Came Here");
  //        this.navCtrl.push(LoginPage);
  //   }
  // }

}
