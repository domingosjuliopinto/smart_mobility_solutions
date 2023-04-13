import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-selfnavig',
  templateUrl: './selfnavig.page.html',
  styleUrls: ['./selfnavig.page.scss'],
})
export class SelfnavigPage implements OnInit {
  constructor(protected navController: NavController) {}

  ngOnInit() {}

  goToMapPage(): void {
    this.navController.navigateBack('/tabs/map');
  }
}
