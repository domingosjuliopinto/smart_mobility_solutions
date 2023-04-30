import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Parcel } from './parcel.model';
import { ParcelService } from './parcel.service';
import { Account } from 'src/model/account.model';
import { AccountService } from '../../../services/auth/account.service';
import { Delivery } from '../delivery/delivery.model';
import { DeliveryService } from '../delivery/delivery.service';
import { Fleet } from '../fleet/fleet.model';
import { FleetService } from '../fleet/fleet.service';

@Component({
  selector: 'page-parcel',
  templateUrl: 'parcel.html',
  styleUrls: ['parcel-detail.scss'],
})
export class ParcelPage {
  parcels: Parcel[];
  fleets: Fleet[];
  deliveries: Delivery[];

  // todo: add pagination

  constructor(
    private navController: NavController,
    private parcelService: ParcelService,
    private fleetService: FleetService,
    private deliveryService: DeliveryService,
    private accountService: AccountService,
    private toastCtrl: ToastController,
    public plt: Platform
  ) {
    this.parcels = [];
    this.fleets = [];
    this.deliveries = [];
  }

  account: Account;

  job_count = false;
  job_history = 0;
  i = 0;
  j = 0;
  drive_id = 0;
  pararr = [];

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
    await this.loadAll3();
    await this.loadAll2();
    await this.loadAll();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.currentjob();
    }, 300);
    setTimeout(()=>{
      const sentparcelid = document.getElementById('sentparcelid');
      const receivedparcelid = document.getElementById('receivedparcelid');
      if (!sentparcelid && !receivedparcelid) {
        this.job_count = true;
      } else {
        this.job_count = false;
      }
    },350);
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

  async loadAll2(refresher?) {
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

  async loadAll3(refresher?) {
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

  currentjob(){
    for(this.i=0;this.i<this.fleets?.length;this.i++){
      if(this.fleets[this.i].driver_email==this.account.email){
        this.drive_id = this.fleets[this.i].id;
      }
    }
    for(this.j=0;this.j<this.deliveries?.length;this.j++){
      if(this.deliveries[this.j].driver_id==this.drive_id){
        this.pararr.push(this.deliveries[this.j].parcel_id)
      }
    }
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

  private goBackToHomePage(): void {
    this.navController.navigateBack('');
  }

  async historyview(number) {
    this.job_history = number;
    if (this.job_history == 0) {
      setTimeout(() => {
        const sentparcelid = document.getElementById('sentparcelid');
        if (!sentparcelid) {
          this.job_count = true;
        } else {
          this.job_count = false;
        }
      }, 10);
    } else if (this.job_history == 1) {
      setTimeout(() => {
        const receivedparcelid = document.getElementById('receivedparcelid');
        if (!receivedparcelid) {
          this.job_count = true;
        } else {
          this.job_count = false;
        }
      }, 10);
    }
  }
}
