import {Component, Injectable} from '@angular/core';
import {  NavController, App } from 'ionic-angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { LoginPage } from '../login/login';
import {Storage} from "@ionic/storage";
//import '../../assets/js/kinesis.js';
import {Headers, RequestOptions} from '@angular/http';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import  {MySensorPage} from "../my-sensor/my-sensor";
import {AboutPage} from "../about/about";
import {SettingsPage} from "../settings/settings";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


@Injectable()
export class HomePage {
  mySensorPage = MySensorPage;
  aboutPage = AboutPage;
  settingsPage = SettingsPage;

  constructor(public app: App, public navCtrl: NavController, public oauthService: OAuthService,
              private http: Http) {
    this.http = http;
   // alreadySent = false;
  }

  ionViewDidLoad() {
   // if (!(alreadySent)) {
      //alreadySent = true;
   /*   let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers, withCredentials: true});
    let body = JSON.stringify({
      email: "someEmail",
      password: "somePasswordd" });

      this.http.post("http://sensorapi.ngrok.io/rest/incoming/save", body, options)
        .subscribe(data => {
          console.log("Got:", data);
        }, error => {
          console.log(JSON.stringify(error.json()));
        });
    //}
    */
  }

  sendContent() {
    let body = JSON.stringify({
      email: "someEmail",
      password: "somePasswordd"
    });
  }

  //console.log("Crap =", crap)
  logout() {
    this.oauthService.logOut();
    this.app.getRootNav().setRoot(LoginPage);
//     this.navCtrl.popToRoot();
  }


  get givenName() {
    const claims: any = this.oauthService.getIdentityClaims();
   // console.log("Getting accessToken:", this.oauthService.getIdToken());
    // lets send the info to aws
   // if (!sent) {
  //    this.sendContent();
   //   sent = true;
   // }
    if (!claims) {
      return null;
    }
    return claims.name;
  }

  get claims() {
    return this.oauthService.getIdentityClaims();
  }
}
