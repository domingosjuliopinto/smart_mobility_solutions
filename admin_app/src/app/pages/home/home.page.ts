import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Account } from 'src/model/account.model';
import { Autoplay, EffectCube, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { AccountService } from '../../services/auth/account.service';
import { LoginService } from '../../services/login/login.service';
import SwiperCore from 'swiper';

SwiperCore.use([Autoplay, EffectCube]);
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pages = [
    {
      title: 'Home',
      url: '/tabs/home',
      icon: 'home',
    },
    {
      title: 'Map',
      url: '/tabs/map',
      icon: 'map',
    },
    {
      title: 'Tracking Services',
      children: [
        {
          title: 'Send Parcel',
          url: '/tabs/parcel/new',
          icon: 'cube-outline',
        },
        {
          title: 'Check Stats',
          url: '/tabs/driverstats',
          icon: 'stats-chart-outline',
        },
      ],
    },
  ];

  @ViewChild('swiper') swiper: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 'auto',
    effect: 'cube',
    loop: true,
    autoplay: true,
  };

  images = [
    'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3',
    'https://images.unsplash.com/photo-1561464382-349a0d78a9b7',
    'https://images.unsplash.com/photo-1488998628026-a1a79746cdcd',
  ];

  account: Account;

  constructor(
    public navController: NavController,
    private accountService: AccountService,
    private loginService: LoginService,
    public menuCtrl: MenuController
  ) {
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

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  swiperSliderChanged(e: any) {
    console.log('changed: ', e);
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.goBackToHomePage();
  }

  private goBackToHomePage(): void {
    this.navController.navigateBack('');
  }
}
