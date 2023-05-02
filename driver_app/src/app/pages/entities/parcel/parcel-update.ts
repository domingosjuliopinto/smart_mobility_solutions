import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Parcel } from './parcel.model';
import { ParcelService } from './parcel.service';
import { Fleet } from '../fleet/fleet.model';
import { FleetService } from '../fleet/fleet.service';
import { Delivery } from '../delivery/delivery.model';
import { DeliveryService } from '../delivery/delivery.service';

@Component({
  selector: 'page-parcel-update',
  templateUrl: 'parcel-update.html',
  styleUrls: ['parcel-update.scss','parcel-detail.scss'],
})
export class ParcelUpdatePage implements OnInit {
  parcel: Parcel;
  deliveries: {};
  fleet : {};
  isSaving = false;
  isNew = true;
  isReadyToSave: boolean;
  change = null;
  driveid = 0;

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
    private parcelService: ParcelService,
    private fleetService: FleetService,
    private deliveryService: DeliveryService
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

  save(final) {
    this.isSaving = true;
    const parcel = this.createFromForm();
    if (!this.isNew) {
      this.subscribeToSaveResponse(this.parcelService.update(parcel),final);
    } else {
      this.subscribeToSaveResponse(this.parcelService.create(parcel),final);
    }
  }

  savef() {
    this.isSaving = true;
    this.loadAll1();
    setTimeout(() => {
      const fleet = this.createFromFormF(this.fleet);
      this.subscribeToSaveResponseF(this.fleetService.update(fleet));
    }, 300);
  }

  saved() {
    this.isSaving = true;
    this.loadAll();
    setTimeout(() => {
      const delivery = this.createFromFormD(this.deliveries);
      this.driveid = delivery.driver_id
      this.subscribeToSaveResponseD(this.deliveryService.update(delivery));
    }, 300);
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<Parcel>>,final) {
    result.subscribe(
      (res: HttpResponse<Parcel>) => this.onSaveSuccess(res,final),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  protected subscribeToSaveResponseD(result: Observable<HttpResponse<Delivery>>) {
    result.subscribe(
      (res: HttpResponse<Delivery>) => this.onSaveSuccessD(res),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  protected subscribeToSaveResponseF(result: Observable<HttpResponse<Fleet>>) {
    result.subscribe(
      (res: HttpResponse<Fleet>) => this.onSaveSuccessF(res),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  async onSaveSuccess(response,final) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `Parcel ${action} successfully.`, duration: 2000, position: 'middle' });
    await toast.present();
    if(final){
      this.saved();
    }else{
      await this.navController.navigateBack('/tabs/parcel');
    }
  }

  async onSaveSuccessD(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `Completing Formalities`, duration: 2000, position: 'middle' });
    await toast.present();
    this.savef();
  }

  async onSaveSuccessF(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `Delivery Completed`, duration: 2000, position: 'middle' });
    await toast.present();
    await this.navController.navigateBack('/tabs/parcel');
  }

  pwd(){
    this.change = "Parcel with Driver"
    this.save(false)
  }

  pc(){
    this.change = "Completed"
    this.save(true)
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
      status: this.change?this.change:this.form.get(['status']).value,
    };
  }

  private createFromFormF(fleet): Fleet {
    return {
      ...new Fleet(),
      id: fleet.id,
      driver_name: fleet.driver_name,
      driver_email: fleet.driver_email,
      driver_address: fleet.driver_address,
      driver_phone_no: fleet.driver_phone_no,
      vehicle_plate_no: fleet.vehicle_plate_no,
      vehicle_type: fleet.vehicle_type,
      vehicle_status: 'Free',
    };
  }

  private createFromFormD(deliveries): Delivery {
    return {
      ...new Delivery(),
      id: deliveries.id,
      parcel_id: deliveries.parcel_id,
      driver_id: deliveries.driver_id,
      request_time: deliveries.request_time,
      assigned_time: deliveries.assigned_time,
      estimated_time: deliveries.estimated_time,
      ended_time: new Date().toISOString().slice(0, 19) + 'Z',
      star_received: null,
    };
  }

  loadAll(refresher?) {
    this.deliveryService
      .query()
      .pipe(
        filter((res: HttpResponse<Delivery[]>) => res.ok),
        map((res: HttpResponse<Delivery[]>) => res.body)
      )
      .subscribe(
        (response: Delivery[]) => {
          for(var i =0;i<response?.length;i++){
            if(response[i].parcel_id == this.parcel.id){
              this.deliveries = response[i];
              break
            }
          }
          if (typeof refresher !== 'undefined') {
            setTimeout(() => {
              refresher.target.complete();
            }, 750);
          }
        },
        async error => {
          console.error(error);
          const toast = await this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
          await toast.present();
        }
      );
  }

  async loadAll1(refresher?) {
    this.fleetService
      .query()
      .pipe(
        filter((res: HttpResponse<Fleet[]>) => res.ok),
        map((res: HttpResponse<Fleet[]>) => res.body)
      )
      .subscribe(
        (response: Fleet[]) => {
          for(var i =0;i<response?.length;i++){
            if(response[i].id == this.driveid){
              this.fleet = response[i];
              break
            }
          }
          if (typeof refresher !== 'undefined') {
            setTimeout(() => {
              refresher.target.complete();
            }, 750);
          }
        },
        async error => {
          console.error(error);
          const toast = await this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
          await toast.present();
        }
      );
  }
}
