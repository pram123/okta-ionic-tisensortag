import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  private storage: Storage;
  apiEndpoint: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public  myStorage:Storage) {
    console.log("Init. settings");
    this.storage = myStorage;
    this.init();
  }

   init() {
     // Lets see if we've saved the apiEndpoint location
     this.storage.get('apiEndpoint').then((savedInfo) =>
         this.apiEndpoint = savedInfo,
       error => this.apiEndpoint = "https://39593de4.ngrok.io");
     console.log('APIEndpoint to save results is:', this.apiEndpoint);

   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');

    // lets see if we have something configured for
  }

}
