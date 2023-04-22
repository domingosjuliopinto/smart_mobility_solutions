import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Fleet } from './fleet.model';
import { FleetService } from './fleet.service';

@Component({
  selector: 'page-fleet',
  templateUrl: 'fleet.html',
})
export class FleetPage {
  fleets: Fleet[];

  // todo: add pagination

  constructor(
    private navController: NavController,
    private fleetService: FleetService,
    private toastCtrl: ToastController,
    public plt: Platform
  ) {
    this.fleets = [];
  }

  async ionViewWillEnter() {
    await this.loadAll();
  }

  async loadAll(refresher?) {
    this.fleetService
      .query()
      .pipe(
        filter((res: HttpResponse<Fleet[]>) => res.ok),
        map((res: HttpResponse<Fleet[]>) => res.body)
      )
      .subscribe(
        (response: Fleet[]) => {
          this.fleets = response;
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

  trackId(index: number, item: Fleet) {
    return item.id;
  }

  async new() {
    await this.navController.navigateForward('/tabs/fleet/new');
  }

  async edit(item: IonItemSliding, fleet: Fleet) {
    await this.navController.navigateForward('/tabs/fleet/' + fleet.id + '/edit');
    await item.close();
  }

  async delete(fleet) {
    this.fleetService.delete(fleet.id).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({ message: 'Fleet deleted successfully.', duration: 3000, position: 'middle' });
        await toast.present();
        await this.loadAll();
      },
      error => console.error(error)
    );
  }

  async view(fleet: Fleet) {
    await this.navController.navigateForward('/tabs/fleet/' + fleet.id + '/view');
  }
}
