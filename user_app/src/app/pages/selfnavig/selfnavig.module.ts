import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfnavigPageRoutingModule } from './selfnavig-routing.module';

import { SelfnavigPage } from './selfnavig.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SelfnavigPageRoutingModule],
  declarations: [SelfnavigPage],
})
export class SelfnavigPageModule {}
