import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, NavController, ToastController } from '@ionic/angular';
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
      title: 'Self Navigation',
      url: '/tabs/selfnavig',
      icon: 'navigate-outline',
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
          title: 'Locate Parcel',
          url: '/tabs/sboneb',
          icon: 'locate-outline',
        },
        {
          title: 'Parcel History',
          url: '/tabs/parcel',
          icon: 'clipboard-outline',
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
  trackingnumber = '';

  constructor(
    public navController: NavController,
    private accountService: AccountService,
    protected toastCtrl: ToastController,
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

  onInput(event: any) {
    this.trackingnumber = event.target.value.trim();
    // do something with the tracking number, such as sending it to a server or updating a local variable
  }

  async onTrack(){
    
      const input = this.trackingnumber;
    
      if (input == '') {
        // input is empty, do nothing
        const toast = await this.toastCtrl.create({ message: `No Tracking ID Entered`, duration: 2000, position: 'middle' });
        await toast.present();
        return
      }
    
      const number = Number(input);
    
      if (isNaN(number) || number <= 0 || !Number.isInteger(number)) {
        // input is not a positive integer, display error message
        const toast = await this.toastCtrl.create({ message: `Invalid Tracking ID: Please enter a valid Tracking ID`, duration: 2000, position: 'middle' });
        await toast.present();
        return;
      }
    
      try{
        await this.navController.navigateForward('/tabs/parcel/'+number+'/view');
      }catch(error){
        const toast = await this.toastCtrl.create({ message: `Parcel with this ID doesn't exist`, duration: 2000, position: 'middle' });
        await toast.present();
      }
      
  }
  
}
