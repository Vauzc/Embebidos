import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-Noticias',
  templateUrl: 'Noticias.page.html',
  styleUrls: ['Noticias.page.scss']
})
export class NoticiasPage {

  constructor(private browser : InAppBrowser, private modalCtrl : ModalController) {
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 995
        },
        {
          id: 925
        },
        {
          id: 940
        },
        {
          id: 943
        },
        {
          id: 944
        }
      ]
    };
  }

  openUrl (url: string){
    const link=url
    this.browser.create(link, '_self')
  }


  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;

  sliderOne: any;

  slideOptsOne = {
    initialSlide: 1,
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    autoplay: true,
    spaceBetween: 5
  };
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }



}
