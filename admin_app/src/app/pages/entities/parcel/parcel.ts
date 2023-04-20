import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Parcel } from './parcel.model';
import { ParcelService } from './parcel.service';

@Component({
  selector: 'page-parcel',
  templateUrl: 'parcel.html',
  styleUrls: ['parcel-detail.scss'],
})
export class ParcelPage {
  parcels: Parcel[];

  // todo: add pagination

  constructor(
    private navController: NavController,
    private parcelService: ParcelService,
    private toastCtrl: ToastController,
    public plt: Platform
  ) {
    this.parcels = [];
  }

  async ionViewWillEnter() {
    await this.loadAll();
  }

  async loadAll(refresher?) {
    this.parcelService
      .query()
      .pipe(
        filter((res: HttpResponse<Parcel[]>) => res.ok),
        map((res: HttpResponse<Parcel[]>) => res.body)
      )
      .subscribe(
        (response: Parcel[]) => {
          this.parcels = response;
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

  trackId(index: number, item: Parcel) {
    return item.id;
  }

  async new() {
    await this.navController.navigateForward('/tabs/parcel/new');
  }

  async edit(parcel: Parcel) {
    await this.navController.navigateForward('/tabs/parcel/' + parcel.id + '/edit');
  }

  async delete(parcel) {
    this.parcelService.delete(parcel.id).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({ message: 'Parcel deleted successfully.', duration: 3000, position: 'middle' });
        await toast.present();
        await this.loadAll();
      },
      error => console.error(error)
    );
  }

  async view(parcel: Parcel) {
    await this.navController.navigateForward('/tabs/parcel/' + parcel.id + '/view');
  }
}
