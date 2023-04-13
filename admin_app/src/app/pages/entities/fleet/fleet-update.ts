import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Fleet } from './fleet.model';
import { FleetService } from './fleet.service';

@Component({
  selector: 'page-fleet-update',
  templateUrl: 'fleet-update.html',
})
export class FleetUpdatePage implements OnInit {
  fleet: Fleet;
  isSaving = false;
  isNew = true;
  isReadyToSave: boolean;

  form = this.formBuilder.group({
    id: [null, []],
    driver_name: [null, [Validators.required]],
    driver_email: [null, [Validators.required]],
    driver_address: [null, [Validators.required]],
    driver_phone_no: [null, [Validators.required]],
    vehicle_plate_no: [null, []],
    vehicle_type: [null, [Validators.required]],
    vehicle_status: [null, [Validators.required]],
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected navController: NavController,
    protected formBuilder: FormBuilder,
    public platform: Platform,
    protected toastCtrl: ToastController,
    private fleetService: FleetService
  ) {
    // Watch the form for changes, and
    this.form.valueChanges.subscribe(v => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(response => {
      this.fleet = response.data;
      this.isNew = this.fleet.id === null || this.fleet.id === undefined;
      this.updateForm(this.fleet);
    });
  }

  updateForm(fleet: Fleet) {
    this.form.patchValue({
      id: fleet.id,
      driver_name: fleet.driver_name,
      driver_email: fleet.driver_email,
      driver_address: fleet.driver_address,
      driver_phone_no: fleet.driver_phone_no,
      vehicle_plate_no: fleet.vehicle_plate_no,
      vehicle_type: fleet.vehicle_type,
      vehicle_status: fleet.vehicle_status,
    });
  }

  save() {
    this.isSaving = true;
    const fleet = this.createFromForm();
    if (!this.isNew) {
      this.subscribeToSaveResponse(this.fleetService.update(fleet));
    } else {
      this.subscribeToSaveResponse(this.fleetService.create(fleet));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<Fleet>>) {
    result.subscribe(
      (res: HttpResponse<Fleet>) => this.onSaveSuccess(res),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  async onSaveSuccess(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `Fleet ${action} successfully.`, duration: 2000, position: 'middle' });
    await toast.present();
    await this.navController.navigateBack('/tabs/entities/fleet');
  }

  previousState() {
    window.history.back();
  }

  async onError(error) {
    this.isSaving = false;
    console.error(error);
    const toast = await this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
    await toast.present();
  }

  private createFromForm(): Fleet {
    return {
      ...new Fleet(),
      id: this.form.get(['id']).value,
      driver_name: this.form.get(['driver_name']).value,
      driver_email: this.form.get(['driver_email']).value,
      driver_address: this.form.get(['driver_address']).value,
      driver_phone_no: this.form.get(['driver_phone_no']).value,
      vehicle_plate_no: this.form.get(['vehicle_plate_no']).value,
      vehicle_type: this.form.get(['vehicle_type']).value,
      vehicle_status: this.form.get(['vehicle_status']).value,
    };
  }
}
