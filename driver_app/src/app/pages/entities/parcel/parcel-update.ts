import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Parcel } from './parcel.model';
import { ParcelService } from './parcel.service';

@Component({
  selector: 'page-parcel-update',
  templateUrl: 'parcel-update.html',
})
export class ParcelUpdatePage implements OnInit {
  parcel: Parcel;
  isSaving = false;
  isNew = true;
  isReadyToSave: boolean;

  form = this.formBuilder.group({
    id: [null, []],
    sender_name: [null, [Validators.required]],
    sender_email: [null, [Validators.required]],
    sender_address: [null, [Validators.required]],
    sender_phone_no: [null, [Validators.required]],
    receiver_name: [null, [Validators.required]],
    receiver_email: [null, [Validators.required]],
    receiver_address: [null, [Validators.required]],
    receiver_phone_no: [null, [Validators.required]],
    parcel_name: [null, [Validators.required]],
    parcel_type: [null, [Validators.required]],
    parcel_weight_in_kg: [null, [Validators.required]],
    status: [null, [Validators.required]],
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected navController: NavController,
    protected formBuilder: FormBuilder,
    public platform: Platform,
    protected toastCtrl: ToastController,
    private parcelService: ParcelService
  ) {
    // Watch the form for changes, and
    this.form.valueChanges.subscribe(v => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(response => {
      this.parcel = response.data;
      this.isNew = this.parcel.id === null || this.parcel.id === undefined;
      this.updateForm(this.parcel);
    });
  }

  updateForm(parcel: Parcel) {
    this.form.patchValue({
      id: parcel.id,
      sender_name: parcel.sender_name,
      sender_email: parcel.sender_email,
      sender_address: parcel.sender_address,
      sender_phone_no: parcel.sender_phone_no,
      receiver_name: parcel.receiver_name,
      receiver_email: parcel.receiver_email,
      receiver_address: parcel.receiver_address,
      receiver_phone_no: parcel.receiver_phone_no,
      parcel_name: parcel.parcel_name,
      parcel_type: parcel.parcel_type,
      parcel_weight_in_kg: parcel.parcel_weight_in_kg,
      status: parcel.status,
    });
  }

  save() {
    this.isSaving = true;
    const parcel = this.createFromForm();
    if (!this.isNew) {
      this.subscribeToSaveResponse(this.parcelService.update(parcel));
    } else {
      this.subscribeToSaveResponse(this.parcelService.create(parcel));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<Parcel>>) {
    result.subscribe(
      (res: HttpResponse<Parcel>) => this.onSaveSuccess(res),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  async onSaveSuccess(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `Parcel ${action} successfully.`, duration: 2000, position: 'middle' });
    await toast.present();
    await this.navController.navigateBack('/tabs/entities/parcel');
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

  private createFromForm(): Parcel {
    return {
      ...new Parcel(),
      id: this.form.get(['id']).value,
      sender_name: this.form.get(['sender_name']).value,
      sender_email: this.form.get(['sender_email']).value,
      sender_address: this.form.get(['sender_address']).value,
      sender_phone_no: this.form.get(['sender_phone_no']).value,
      receiver_name: this.form.get(['receiver_name']).value,
      receiver_email: this.form.get(['receiver_email']).value,
      receiver_address: this.form.get(['receiver_address']).value,
      receiver_phone_no: this.form.get(['receiver_phone_no']).value,
      parcel_name: this.form.get(['parcel_name']).value,
      parcel_type: this.form.get(['parcel_type']).value,
      parcel_weight_in_kg: this.form.get(['parcel_weight_in_kg']).value,
      status: this.form.get(['status']).value,
    };
  }
}
