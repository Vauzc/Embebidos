import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { AppAvailability } from '@ionic-native/app-availability/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'GruposE.page.html',
  styleUrls: ['GruposE.page.scss'],
})
export class GruposEPage {

  constructor(
    public platform: Platform,
    private appAvailability: AppAvailability,
    private modalCtrl : ModalController,
    private inAppBrowser: InAppBrowser) { }

  openFacebook(name, url) {
    let app;

    if (this.platform.is('ios')) {
      app = 'fb://';
    } else if (this.platform.is('android')) {
      app = 'com.facebook.katana';
    } else {
      const browser: InAppBrowserObject = this.inAppBrowser.create('https://www.facebook.com/' + name);
      return;
    }

    this.appAvailability.check(app)
      .then(
        (yes: boolean) => {
          console.log(app + ' is available')
          // Success
          // App exists
          const browser: InAppBrowserObject = this.inAppBrowser.create('fb://facewebmodal/f?href=' + url, '_system');
        },
        (no: boolean) => {
          // Error
          // App does not exist
          // Open Web URL
          const browser: InAppBrowserObject = this.inAppBrowser.create('https://www.facebook.com/' + name, '_system');
        }
      );
  }

  openInstagram(name, url) {
    let app;

    if (this.platform.is('ios')) {
      app = 'instagram://';
    } else if (this.platform.is('android')) {
      app = 'com.instagram.android';
    } else {
      const browser: InAppBrowserObject = this.inAppBrowser.create('https://www.instagram.com/' + name);
      return;
    }

    this.appAvailability.check(app)
      .then(
        (yes: boolean) => {
          console.log(app + ' is available')
          // Success
          // App exists
          const browser: InAppBrowserObject = this.inAppBrowser.create('instagram://user?username=' + name, '_system');
        },
        (no: boolean) => {
          // Error
          // App does not exist
          // Open Web URL
          const browser: InAppBrowserObject = this.inAppBrowser.create('https://www.instagram.com/' + name, '_system');
        }
      );
  }

  openTwitter(name, url) {
    let app;

    if (this.platform.is('ios')) {
      app = 'twitter://';
    } else if (this.platform.is('android')) {
      app = 'com.twitter.android';
    } else {
      const browser: InAppBrowserObject = this.inAppBrowser.create('https://twitter.com/' + name);
      return;
    }

    this.appAvailability.check(app)
      .then(
        (yes: boolean) => {
          console.log(app + ' is available')
          // Success
          // App exists
          const browser: InAppBrowserObject = this.inAppBrowser.create('twitter://user?screen_name=' + name, '_system');
        },
        (no: boolean) => {
          // Error
          // App does not exist
          // Open Web URL
          const browser: InAppBrowserObject = this.inAppBrowser.create('https://twitter.com/' + name, '_system');
        }
      );
  }
  openYoutube(name, url) {
    let app;

    if (this.platform.is('ios')) {
      app = 'youtube://';
    } else if (this.platform.is('android')) {
      app = 'com.youtube.android';
    } else {
      const browser: InAppBrowserObject = this.inAppBrowser.create('https://youtube.com/' + name);
      return;
    }

    this.appAvailability.check(app)
      .then(
        (yes: boolean) => {
          console.log(app + ' is available')
          // Success
          // App exists
          const browser: InAppBrowserObject = this.inAppBrowser.create('youtube://channel?name=' + name, '_system');
        },
        (no: boolean) => {
          // Error
          // App does not exist
          // Open Web URL
          const browser: InAppBrowserObject = this.inAppBrowser.create('https://youtube.com/' + name, '_system');
        }
      );
  }

  
  public ocultar1: boolean = false;
  public ocultar2: boolean = false;
  public ocultar3: boolean = false;
  public ocultar4: boolean = false;

  cerrar(){
    this.modalCtrl.dismiss()
  }
  accion1(){
    this.ocultar1 = !this.ocultar1;
    this.ocultar2 = false;
    this.ocultar3 = false;
    this.ocultar4 = false;
  }
  accion2(){
    this.ocultar2 = !this.ocultar2;
    this.ocultar1 = false;
    this.ocultar3 = false;
    this.ocultar4 = false;
  }
  accion3(){
    this.ocultar3 = !this.ocultar3;
    this.ocultar1 = false;
    this.ocultar2 = false;
    this.ocultar4 = false;
  }
  accion4(){
    this.ocultar4 = !this.ocultar4;
    this.ocultar1 = false;
    this.ocultar2 = false;
    this.ocultar3 = false;
  }
  openUrl (url: string){
    const link=url
    this.inAppBrowser.create(link, '_self')
  }
}
