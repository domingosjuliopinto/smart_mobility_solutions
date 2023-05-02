import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Delivery } from './delivery.model';
import { DeliveryService } from './delivery.service';

@Component({
  selector: 'page-delivery-update',
  templateUrl: 'delivery-update.html',
  styleUrls: ['delivery-detail.scss'],
})
export class DeliveryUpdatePage implements OnInit {
  delivery: Delivery;
  request_time: string;
  assigned_time: string;
  estimated_time: string;
  ended_time: string;
  isSaving = false;
  isNew = true;
  isReadyToSave: boolean;

  form = this.formBuilder.group({
    id: [null, []],
    parcel_id: [null, [Validators.required]],
    driver_id: [null, []],
    request_time: [null, [Validators.required]],
    assigned_time: [null, []],
    estimated_time: [null, []],
    ended_time: [null, []],
    star_received: [null, []],
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected navController: NavController,
    protected formBuilder: FormBuilder,
    public platform: Platform,
    protected toastCtrl: ToastController,
    private deliveryService: DeliveryService
  ) {
    // Watch the form for changes, and
    this.form.valueChanges.subscribe(v => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(response => {
      this.delivery = response.data;
      this.isNew = this.delivery.id === null || this.delivery.id === undefined;
      this.updateForm(this.delivery);
    });
  }

  updateForm(delivery: Delivery) {
    this.form.patchValue({
      id: delivery.id,
      parcel_id: delivery.parcel_id,
      driver_id: delivery.driver_id,
      request_time: this.isNew ? new Date().toISOString() : delivery.request_time,
      assigned_time: this.isNew ? new Date().toISOString() : delivery.assigned_time,
      estimated_time: this.isNew ? new Date().toISOString() : delivery.estimated_time,
      ended_time: this.isNew ? new Date().toISOString() : delivery.ended_time,
      star_received: delivery.star_received,
    });
  }

  save() {
    this.isSaving = true;
    const delivery = this.createFromForm();
    if (!this.isNew) {
      this.subscribeToSaveResponse(this.deliveryService.update(delivery));
    } else {
      this.subscribeToSaveResponse(this.deliveryService.create(delivery));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<Delivery>>) {
    result.subscribe(
      (res: HttpResponse<Delivery>) => this.onSaveSuccess(res),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  async onSaveSuccess(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `Delivery ${action} successfully.`, duration: 2000, position: 'middle' });
    await toast.present();
    await this.navController.navigateBack('/tabs/delivery');
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

  private createFromForm(): Delivery {
    return {
      ...new Delivery(),
      id: this.form.get(['id']).value,
      parcel_id: this.form.get(['parcel_id']).value,
      driver_id: this.form.get(['driver_id']).value,
      request_time: new Date(this.form.get(['request_time']).value),
      assigned_time: new Date(this.form.get(['assigned_time']).value),
      estimated_time: new Date(this.form.get(['estimated_time']).value),
      ended_time: new Date(this.form.get(['ended_time']).value),
      star_received: this.form.get(['star_received']).value,
    };
  }
}
