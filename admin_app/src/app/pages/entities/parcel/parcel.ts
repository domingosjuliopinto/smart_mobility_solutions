import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Parcel } from './parcel.model';
import { ParcelService } from './parcel.service';
import { Account } from 'src/model/account.model';
import { AccountService } from '../../../services/auth/account.service';

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
    private accountService: AccountService,
    private toastCtrl: ToastController,
    public plt: Platform
  ) {
    this.parcels = [];
  }

  account: Account;
  sent_parcel_count = false;
  received_parcel_count = false;
  parcel_history = 0;

  ngOnInit() {
    this.accountService.identity().then(account => {
      if (account === null) {
        this.goBackToHomePage();
      } else {
        this.account = account;
      }
    });
  }

  async ionViewWillEnter() {
    await this.loadAll();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      const sentparcelid = document.getElementById('sentparcelid');
      if (!sentparcelid) {
        this.sent_parcel_count = true;
      } else {
        this.sent_parcel_count = false;
      }
    }, 300);
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

  async edit(item: IonItemSliding, parcel: Parcel) {
    await this.navController.navigateForward('/tabs/parcel/' + parcel.id + '/edit');
    await item.close();
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

  private goBackToHomePage(): void {
    this.navController.navigateBack('');
  }

  async historyview(number) {
    this.parcel_history = number;
    if (this.parcel_history == 0) {
      setTimeout(() => {
        const sentparcelid = document.getElementById('sentparcelid');
        if (!sentparcelid) {
          this.sent_parcel_count = true;
        } else {
          this.sent_parcel_count = false;
        }
      }, 10);
    } else if (this.parcel_history == 1) {
      setTimeout(() => {
        const receivedparcelid = document.getElementById('receivedparcelid');
        if (!receivedparcelid) {
          this.received_parcel_count = true;
        } else {
          this.received_parcel_count = false;
        }
      }, 10);
    }
  }
}
