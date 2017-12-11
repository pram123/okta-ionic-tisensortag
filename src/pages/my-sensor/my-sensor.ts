import {ElementRef, OnInit, Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions, HttpModule} from '@angular/http';
import {OAuthService} from "angular-oauth2-oidc";
import {Subscription} from "rxjs/Subscription";
import  {Chart} from "chart.js"
import * as _ from 'lodash';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the MySensorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *
 * TODO: Find a better way to send info instead of post.. ie: socketIO
 */
declare var app;  // the TISensorApp

/*global gyroGraph; */


// yeah - globals are bad. TODO: Update
/* Everything associated with the gyroscope to graph */
let gyroGraph: any;
let gyroXVals = [0];
let gyroYVals = [0];
let gyroZVals = [0];
let gyroLabels = [new Date().getTime()];

let accGraph: any;
let accXVals = [0];
let accYVals = [0];
let accZVals = [0];
let accLabels = [new Date().getTime()];

var t;

@IonicPage()
@Component({
  selector: 'page-my-sensor',
  templateUrl: 'my-sensor.html',
})
export class MySensorPage {

  @ViewChild('gyroCanvas') gyroCanvas;
  @ViewChild('accCanvas') accCanvas;
  //http:Http;
  //let http;

  constructor(public navCtrl: NavController, public navParams: NavParams, public oauthService: OAuthService,
              private http: Http) {
    this.http = http;
  }

  /* capture and info in a msg and return the json msg */
  captureInfo() {
    if (!document.getElementById("detailPage").hidden) {
      var myStats = {
        accInfo: (document.getElementById("accelerometerData").innerText),
        barInfo: parseInt(document.getElementById("barometerData").innerText),
        tempInfo: parseInt(document.getElementById("temperatureData").innerText),
        gyroInfo: document.getElementById("gyroData").innerText,
        // magInfo: (document.getElementById("magData").innerText),
        dataCaptureTime: Date.now()
        // barometer: document.getElementById("barometerData").innerText,
        // button: document.getElementById("buttonState").innerText
      };
     // console.log("GyroInfo", JSON.parse(document.getElementById("gyroData").innerText));
      // console.log("Number elements:", this.sendStats);
      console.log(myStats);
      return myStats;
    } else return null;
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad MySensorPage');
    app.initialize();
    console.log("Initialized TISensor from MySensorPage")

    this.initialize();
    //var sensorPacket;

   //setInterval(this.startSensor(this.http), 1000);
    //setInterval( function() { startSensor(); console.log("Timeout!"); }, 1000 );
    setInterval((function () {
      this.startSensor();
    }).bind(this), 1000);
  }

  sendPacket(sensorPacket: any) {
    console.log("Sending packet..", sensorPacket)
    var msg = {
      sensorData: sensorPacket,
      accessToken: localStorage.getItem("access_token"),
      deviceID: document.getElementById("myDeviceID").innerText
    };

    let body = JSON.stringify(msg);

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: false});
    console.log("Sending:" + body);
    this.http.post("https://sensorapi.ngrok.io/rest/incoming/save", body, options)
      .subscribe(data => {
        console.log("Got:", data);
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  startSensor = function() {
    var sensorPacket = null;
  console.log("Came to startSensor");
    sensorPacket = this.captureInfo();
    if (sensorPacket!=null) {
      console.log("SensorPacket = " + sensorPacket);
      this.updateGyoCanvas(JSON.parse(sensorPacket.gyroInfo));
      this.updateAccCanvas(JSON.parse(sensorPacket.accInfo));
      this.sendPacket(sensorPacket);
    } else {
      console.log("sensorPacket == null");
    }
  };

  initialize() {

    gyroGraph = new Chart(document.getElementById('gyroCanvas'), {
      type: 'line',
      data: {
        labels: gyroLabels,
        datasets: [{data: gyroXVals}, {data: gyroYVals}, {data: gyroZVals}],
      },
      options: {
        responsive: true,
        legend: {display: false},
        tooltips: {enabled: false}
      }
    });

    accGraph = new Chart(document.getElementById('accCanvas'), {
      type: 'line',
      data: {
        labels: accLabels,
        datasets: [{data: accXVals}, {data: accYVals}, {data: accZVals}],
      },
      options: {
        responsive: true,
        legend: {display: false},
        tooltips: {enabled: false}
      }
    });
  }


  /* Look ma - these functions can be generic in the next version */


  updateGyoCanvas(gyroInfo) {
    console.log("Updating gyroCanvas", gyroInfo);
    console.log("Updating gyroCanvas", gyroInfo.x);

    gyroLabels.push(new Date().getSeconds());
    gyroXVals.push(gyroInfo.x);
    gyroYVals.push(gyroInfo.y);
    gyroZVals.push(gyroInfo.z);

    //this.lineChart.update();

    if (gyroXVals.length > 7) {
      gyroLabels.shift();
      gyroXVals.shift();
      gyroYVals.shift();
      gyroZVals.shift();
    }
    gyroGraph.update();

  }



  updateAccCanvas(accInfo) {
    console.log("Updating gyroCanvas", accInfo);
    console.log("Updating gyroCanvas", accInfo.x);

    accLabels.push(new Date().getSeconds());
    accXVals.push(accInfo.x);
    accYVals.push(accInfo.y);
    accZVals.push(accInfo.z);

    //this.lineChart.update();

    if (accXVals.length > 7) {
      accLabels.shift();
      accXVals.shift();
      accYVals.shift();
      accZVals.shift();
    }
    accGraph.update();

  }
}
