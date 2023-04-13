import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SbonebPageRoutingModule } from './sboneb-routing.module';

import { SbonebPage } from './sboneb.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SbonebPageRoutingModule],
  declarations: [SbonebPage],
})
export class SbonebPageModule {}
