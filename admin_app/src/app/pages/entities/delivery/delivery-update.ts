import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Delivery } from './delivery.model';
import { DeliveryService } from './delivery.service';
import { Fleet } from '../fleet/fleet.model';
import { FleetService } from '../fleet/fleet.service';

@Component({
  selector: 'page-delivery-update',
  templateUrl: 'delivery-update.html',
  styleUrls: ['delivery-update.scss'],
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
  flearr = [];
  assignedd = 0;
  drivdata = {}

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
    private fleetService: FleetService,
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
      this.loadAll();
    });
  }

  async loadAll(refresher?) {
    this.fleetService
      .query()
      .pipe(
        filter((res: HttpResponse<Fleet[]>) => res.ok),
        map((res: HttpResponse<Fleet[]>) => res.body)
      )
      .subscribe(
        (response: Fleet[]) => {
          for(var i = 0;i<response?.length;i++){
            if(response[i].vehicle_status=="Free"){
              this.flearr.push(response[i].id)
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

  loadAlld(assignedd,refresher?) {
    this.fleetService
      .query()
      .pipe(
        filter((res: HttpResponse<Fleet[]>) => res.ok),
        map((res: HttpResponse<Fleet[]>) => res.body)
      )
      .subscribe(
        (response: Fleet[]) => {
          for(var i = 0;i<response?.length;i++){
            if(response[i].id==assignedd){
              this.drivdata = response[i]
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

  updateForm(delivery: Delivery) {
    this.form.patchValue({
      id: delivery.id,
      parcel_id: delivery.parcel_id,
      driver_id: delivery.driver_id,
      request_time: this.isNew ? new Date().toISOString() : delivery.request_time,
      estimated_time: this.isNew ? new Date().toISOString() : delivery.estimated_time,
      ended_time: this.isNew ? new Date().toISOString() : delivery.ended_time,
      star_received: delivery.star_received,
    });
  }

  save() {
    this.isSaving = true;
    const delivery = this.createFromForm();
    this.assignedd = delivery.driver_id
    this.subscribeToSaveResponse(this.deliveryService.update(delivery),this.assignedd);
  }

  savef(drivdata) {
    this.isSaving = true;
    const fleet = this.createFromFormf(drivdata);
    this.subscribeToSaveResponsef(this.fleetService.update(fleet));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<Delivery>>,assignedd) {
    result.subscribe(
      (res: HttpResponse<Delivery>) => this.onSaveSuccess(res,assignedd),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  protected subscribeToSaveResponsef(result: Observable<HttpResponse<Fleet>>) {
    result.subscribe(
      (res: HttpResponse<Fleet>) => this.onSaveSuccessf(res),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  async onSaveSuccess(response,assignedd) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `Delivery ${action} successfully.`, duration: 2000, position: 'middle' });
    await toast.present();
    await this.loadAlld(assignedd);
    setTimeout(() => {
      this.savef(this.drivdata)
    }, 300);
  }

  async onSaveSuccessf(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `Fleet ${action} successfully.`, duration: 2000, position: 'middle' });
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
      assigned_time: new Date().toISOString().slice(0, 19) + 'Z',
      estimated_time: new Date(this.form.get(['estimated_time']).value),
      ended_time: null,
      star_received: null,
    };
  }

  private createFromFormf(drivdata): Fleet {
    return {
      ...new Fleet(),
      id: drivdata.id,
      driver_name: drivdata.driver_name,
      driver_email: drivdata.driver_email,
      driver_address: drivdata.driver_address,
      driver_phone_no: drivdata.driver_phone_no,
      vehicle_plate_no: drivdata.vehicle_plate_no,
      vehicle_type: drivdata.vehicle_type,
      vehicle_status: 'Occupied',
    };
  }
}
