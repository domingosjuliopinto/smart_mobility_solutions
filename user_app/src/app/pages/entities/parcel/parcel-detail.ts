import { Component, OnInit } from '@angular/core';
import { Parcel } from './parcel.model';
import { ParcelService } from './parcel.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/model/account.model';
import { AccountService } from '../../../services/auth/account.service';

@Component({
  selector: 'page-parcel-detail',
  templateUrl: 'parcel-detail.html',
  styleUrls: ['parcel-detail.scss'],
})
export class ParcelDetailPage implements OnInit {
  parcel: Parcel = {};

  constructor(
    private navController: NavController,
    private parcelService: ParcelService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {}

  account: Account;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.parcel = response.data;
    });
    this.accountService.identity().then(account => {
      if (account === null) {
        this.goBackToUnauthorizedPage();
      } else {
        this.account = account;
        if (this.parcel.sender_email != this.account.email && this.parcel.receiver_email != this.account.email) {
          this.goBackToUnauthorizedPage();
        }
      }
    });
  }

  open(item: Parcel) {
    this.navController.navigateForward('/tabs/entities/parcel/' + item.id + '/edit');
  }

  async deleteModal(item: Parcel) {
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
            this.parcelService.delete(item.id).subscribe(() => {
              this.navController.navigateForward('/tabs/entities/parcel');
            });
          },
        },
      ],
    });
    await alert.present();
  }

  private goBackToUnauthorizedPage(): void {
    this.navController.navigateBack('/tabs/unauthorized');
  }
}
