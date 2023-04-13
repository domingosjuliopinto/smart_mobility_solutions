import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { unauthorizedPageRoutingModule } from './unauthorized-routing.module';

import { unauthorizedPage } from './unauthorized.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, unauthorizedPageRoutingModule],
  declarations: [unauthorizedPage],
})
export class unauthorizedPageModule {}
