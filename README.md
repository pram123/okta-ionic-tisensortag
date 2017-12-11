This is the mobile app that accompanies the Okta-TISensor project. 

## Introduction
This is an ionic app that was used in a POC showing how Okta can be used to bridge the gap between the user, an application and an IoT device.

## Steps to build
  * `run npm install`
  * Follow steps [here](https://ionicframework.com/docs/cli/cordova/run/) to run the application
    
## How to configure this app
* Follow the steps outlined at the [Okta blog](https://developer.okta.com/blog/2017/08/22/build-an-ionic-app-with-user-authentication#create-an-openid-connect-app-in-okta) to create the OIDC application
* Modify the following files: ``login.ts`` and change the
 `url: 'https://yourOrg.oktapreview.com',
 'oauthService.clientId', 
'https://yourOrg.oktapreview.com/oauth2/ausca4x6gjdoZn9u60h7'`
to the information that you got when the above steps were run  
* Modify ``mysensor.ts`` and change `https://sensorapi.ngrok.io/rest/incoming/save` to your api-server endpoint
  
## How to use this app

*This app does not work on its own*. 
Make sure to get the [TI CC2650 SensorTag](http://www.ti.com/tool/TIDC-CC2650STK-SENSORTAG).

* Make sure to turn on bluetooth and enable location
* Once the app has been installed login to the app using the username/password of the user that's been assigned to the application
* Click on **Connect to Sensor** and make sure your TI Sensor is powered on
* If you do not see your sensor tag ID in the box click on **Scan for devices**
* Select your sensor and information should be being sent to your api-endpoint
* Login to the Okta-API-WWW-TISensor application and you should be able to see sensor data appear on that dashboard

### TODO 
    * Change to SocketIO and MQTT
    * Move away from using raw json update
    
### Testing
    * I only tested it using Android 6.0.1 - other versions **should** work
    