import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ParcelComponent } from './list/parcel.component';
import { ParcelDetailComponent } from './detail/parcel-detail.component';
import { ParcelUpdateComponent } from './update/parcel-update.component';
import { ParcelDeleteDialogComponent } from './delete/parcel-delete-dialog.component';
import { ParcelRoutingModule } from './route/parcel-routing.module';

@NgModule({
  imports: [SharedModule, ParcelRoutingModule],
  declarations: [ParcelComponent, ParcelDetailComponent, ParcelUpdateComponent, ParcelDeleteDialogComponent],
})
export class ParcelModule {}
