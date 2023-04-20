import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Account } from 'src/model/account.model';
import { AccountService } from '../../services/auth/account.service';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss'],
})
export class AccountPage implements OnInit {
  account: Account;

  constructor(public navController: NavController, private accountService: AccountService, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
  }

  openFirst() {
    this.menuCtrl.open('first');
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

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  goBackToHomePage() {
    this.navController.navigateBack('');
  }
}
