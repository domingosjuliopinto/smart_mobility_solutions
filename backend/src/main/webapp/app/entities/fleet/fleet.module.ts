import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FleetComponent } from './list/fleet.component';
import { FleetDetailComponent } from './detail/fleet-detail.component';
import { FleetUpdateComponent } from './update/fleet-update.component';
import { FleetDeleteDialogComponent } from './delete/fleet-delete-dialog.component';
import { FleetRoutingModule } from './route/fleet-routing.module';

@NgModule({
  imports: [SharedModule, FleetRoutingModule],
  declarations: [FleetComponent, FleetDetailComponent, FleetUpdateComponent, FleetDeleteDialogComponent],
})
export class FleetModule {}
