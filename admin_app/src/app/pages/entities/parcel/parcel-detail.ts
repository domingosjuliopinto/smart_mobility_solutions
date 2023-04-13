import { Component, OnInit } from '@angular/core';
import { Parcel } from './parcel.model';
import { ParcelService } from './parcel.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-parcel-detail',
  templateUrl: 'parcel-detail.html',
})
export class ParcelDetailPage implements OnInit {
  parcel: Parcel = {};

  constructor(
    private navController: NavController,
    private parcelService: ParcelService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.parcel = response.data;
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
}
