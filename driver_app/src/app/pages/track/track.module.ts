import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UserRouteAccessService } from 'src/app/services/auth/user-route-access.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';


import { TrackPage } from './track.page';

const routes: Routes = [
  {
    path: '',
    component: TrackPage,
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule.forChild(), RouterModule.forChild(routes)],
  declarations: [TrackPage],
  providers: [Geolocation],
})
export class TrackPageModule {}
