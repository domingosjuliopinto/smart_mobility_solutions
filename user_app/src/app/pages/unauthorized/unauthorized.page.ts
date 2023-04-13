import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.page.html',
  styleUrls: ['./unauthorized.page.scss'],
})
export class unauthorizedPage implements OnInit {
  constructor(private navController: NavController) {}

  ngOnInit() {}

  async goBackToHomePage() {
    this.navController.navigateBack('/tabs/home');
  }
}
