import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Parcel } from '../parcel/parcel.model';
import { ParcelService } from '../parcel/parcel.service';
import { Delivery } from './delivery.model';
import { DeliveryService } from './delivery.service';
import { Account } from 'src/model/account.model';
import { AccountService } from '../../../services/auth/account.service';

@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
  styleUrls: ['delivery-detail.scss'],
})
export class DeliveryPage {
  deliveries: Delivery[];
  pararr = [];

  // todo: add pagination

  constructor(
    private navController: NavController,
    private deliveryService: DeliveryService,
    private parcelService: ParcelService,
    private accountService: AccountService,
    private toastCtrl: ToastController,
    public plt: Platform
  ) {
    this.deliveries = [];
  }

  account: Account;
  sent_parcel_count = false;
  received_parcel_count = false;
  past_parcel_count = false;
  parcel_history = 0;

  async ionViewWillEnter() {
    await this.loadAll();
    await this.loadAll1();
  }

  ngOnInit() {
    this.accountService.identity().then(account => {
      if (account === null) {
        this.goBackToHomePage();
      } else {
        this.account = account;
      }
    });
  }

  private goBackToHomePage(): void {
    this.navController.navigateBack('');
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

  async loadAll1(refresher?) {
    this.parcelService
      .query()
      .pipe(
        filter((res: HttpResponse<Parcel[]>) => res.ok),
        map((res: HttpResponse<Parcel[]>) => res.body)
      )
      .subscribe(
        (response: Parcel[]) => {
          for(var i = 0;i<response?.length; i++){
            if(response[i].sender_email==this.account.email){
              this.pararr.push(response[i].id)
            }
          }
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

  check(did){
    return this.pararr.includes(did)
  }

  async new() {
    await this.navController.navigateForward('/tabs/delivery/new');
  }

  async edit(delivery: Delivery) {
    await this.navController.navigateForward('/tabs/delivery/' + delivery.id + '/edit');
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
