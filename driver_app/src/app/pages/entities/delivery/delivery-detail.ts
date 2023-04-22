import { Component, OnInit } from '@angular/core';
import { Delivery } from './delivery.model';
import { DeliveryService } from './delivery.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-delivery-detail',
  templateUrl: 'delivery-detail.html',
})
export class DeliveryDetailPage implements OnInit {
  delivery: Delivery = {};

  constructor(
    private navController: NavController,
    private deliveryService: DeliveryService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.delivery = response.data;
    });
  }

  open(item: Delivery) {
    this.navController.navigateForward('/tabs/delivery/' + item.id + '/edit');
  }

  async deleteModal(item: Delivery) {
    const alert = await this.alertController.create({
      header: 'Confirm the deletion?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          handler: () => {
            this.deliveryService.delete(item.id).subscribe(() => {
              this.navController.navigateForward('/tabs/delivery');
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
