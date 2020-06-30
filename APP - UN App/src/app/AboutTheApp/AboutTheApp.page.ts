import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';

@Component({
  selector: 'app-AboutTheApp',
  templateUrl: './AboutTheApp.page.html',
  styleUrls: ['./AboutTheApp.page.scss'],
})
export class AboutTheAppPage implements OnInit {

  constructor(public popoverController: PopoverController) {}

  ngOnInit() {
  }
  async opopover(ev){
    const popover = await this.popoverController.create({
      component: PopoverPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}