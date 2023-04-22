import { Component, OnInit } from '@angular/core';
import { Fleet } from './fleet.model';
import { FleetService } from './fleet.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-fleet-detail',
  templateUrl: 'fleet-detail.html',
})
export class FleetDetailPage implements OnInit {
  fleet: Fleet = {};

  constructor(
    private navController: NavController,
    private fleetService: FleetService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.fleet = response.data;
    });
  }

  open(item: Fleet) {
    this.navController.navigateForward('/tabs/fleet/' + item.id + '/edit');
  }

  async deleteModal(item: Fleet) {
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
            this.fleetService.delete(item.id).subscribe(() => {
              this.navController.navigateForward('/tabs/fleet');
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
