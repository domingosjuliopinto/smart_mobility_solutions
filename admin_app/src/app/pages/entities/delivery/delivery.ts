import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Delivery } from './delivery.model';
import { DeliveryService } from './delivery.service';

@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
  styleUrls: ['delivery-detail.scss'],
})
export class DeliveryPage {
  deliveries: Delivery[];

  // todo: add pagination

  constructor(
    private navController: NavController,
    private deliveryService: DeliveryService,
    private toastCtrl: ToastController,
    public plt: Platform
  ) {
    this.deliveries = [];
  }

  async ionViewWillEnter() {
    await this.loadAll();
  }

  async loadAll(refresher?) {
    this.deliveryService
      .query()
      .pipe(
        filter((res: HttpResponse<Delivery[]>) => res.ok),
        map((res: HttpResponse<Delivery[]>) => res.body)
      )
      .subscribe(
        (response: Delivery[]) => {
          this.deliveries = response;
          if (typeof refresher !== 'undefined') {
            setTimeout(() => {
              refresher.target.complete();
            }, 750);
          }
        },
        async error => {
          console.error(error);
          const toast = await this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
          await toast.present();
        }
      );
  }

  trackId(index: number, item: Delivery) {
    return item.id;
  }

  async new() {
    await this.navController.navigateForward('/tabs/delivery/new');
  }

  async edit(item: IonItemSliding, delivery: Delivery) {
    await this.navController.navigateForward('/tabs/delivery/' + delivery.id + '/edit');
    await item.close();
  }

  async delete(delivery) {
    this.deliveryService.delete(delivery.id).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({ message: 'Delivery deleted successfully.', duration: 3000, position: 'middle' });
        await toast.present();
        await this.loadAll();
      },
      error => console.error(error)
    );
  }

  async view(delivery: Delivery) {
    await this.navController.navigateForward('/tabs/delivery/' + delivery.id + '/view');
  }
}
