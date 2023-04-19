import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { Account } from 'src/model/account.model';
import { Autoplay, EffectCube, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { AccountService } from '../../services/auth/account.service';
import { LoginService } from '../../services/login/login.service';
import SwiperCore from 'swiper';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Fleet } from '../entities/fleet/fleet.model';
import { FleetService } from '../entities/fleet/fleet.service';

SwiperCore.use([Autoplay, EffectCube]);
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  fleets: Fleet[];

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
      title: 'Tasks Offered',
      children: [
        {
          title: 'Jobs Assigned',
          url: '/tabs/jobassign',
          icon: 'bag-check-outline',
        },
        {
          title: 'Work Stats',
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
  i = 0;
  driv_acc_email = false;

  constructor(
    public navController: NavController,
    private accountService: AccountService,
    private loginService: LoginService,
    private fleetService: FleetService,
    private toastCtrl: ToastController,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(true);
    this.fleets = [];
  }

  openFirst() {
    this.menuCtrl.open('first');
  }

  async ionViewWillEnter() {
    await this.loadAll();
  }

  async loadAll(refresher?) {
    this.fleetService
      .query()
      .pipe(
        filter((res: HttpResponse<Fleet[]>) => res.ok),
        map((res: HttpResponse<Fleet[]>) => res.body)
      )
      .subscribe(
        (response: Fleet[]) => {
          this.fleets = response;
          for (this.i = 0; this.i < this.fleets?.length; this.i++) {
            if (this.account.email == this.fleets[this.i].driver_email) {
              this.driv_acc_email = true;
              break;
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
