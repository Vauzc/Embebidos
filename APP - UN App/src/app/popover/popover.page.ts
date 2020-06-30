import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor(private toastController: ToastController) { }

  ngOnInit() {
  }
  async showToast() {
    const toast = await this.toastController.create({
      message: 'Eres rebelde, me gusta ;)',
      duration: 1200,
      position: 'bottom',
    });
    toast.present();
  }
}
