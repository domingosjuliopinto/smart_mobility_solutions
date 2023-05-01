import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Parcel } from './parcel.model';
import { ParcelService } from './parcel.service';
import { Delivery } from '../delivery/delivery.model';
import { DeliveryService } from '../delivery/delivery.service';
import { Account } from 'src/model/account.model';
import { AccountService } from '../../../services/auth/account.service';

@Component({
  selector: 'page-parcel-update',
  templateUrl: 'parcel-update.html',
  styleUrls: ['parcel-update.scss'],
})
export class ParcelUpdatePage implements OnInit {
  parcel: Parcel;
  delivery: Delivery;
  isSaving = false;
  isNew = true;
  isReadyToSave: boolean;
  newid = 0;

  form = this.formBuilder.group({
    id: [null, []],
    sender_name: [null, [Validators.required]],
    sender_address: [null, [Validators.required]],
    sender_phone_no: [null, [Validators.required]],
    receiver_name: [null, [Validators.required]],
    receiver_email: [null, [Validators.required]],
    receiver_address: [null, [Validators.required]],
    receiver_phone_no: [null, [Validators.required]],
    parcel_name: [null, [Validators.required]],
    parcel_type: [null, [Validators.required]],
    parcel_weight_in_kg: [null, [Validators.required]],
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected navController: NavController,
    protected formBuilder: FormBuilder,
    private accountService: AccountService,
    public platform: Platform,
    protected toastCtrl: ToastController,
    private parcelService: ParcelService,
    private deliveryService: DeliveryService
  ) {
    // Watch the form for changes, and
    this.form.valueChanges.subscribe(v => {
      this.isReadyToSave = this.form.valid;
    });
  }

  account: Account;
  disabled_sender_email = '';
  pararr=[];
  delarr=[];

  ngOnInit() {
    this.accountService.identity().then(account => {
      if (account === null) {
        this.goBackToHomePage();
      } else {
        this.account = account;
        this.disabled_sender_email = this.account.email;
      }
    });
    this.activatedRoute.data.subscribe(response => {
      this.parcel = response.data;
      this.isNew = this.parcel.id === null || this.parcel.id === undefined;
      this.updateForm(this.parcel);
    });
  }

  private goBackToHomePage(): void {
    this.navController.navigateBack('');
  }

  updateForm(parcel: Parcel) {
    this.form.patchValue({
      id: parcel.id,
      sender_name: parcel.sender_name,
      sender_address: parcel.sender_address,
      sender_phone_no: parcel.sender_phone_no,
      receiver_name: parcel.receiver_name,
      receiver_email: parcel.receiver_email,
      receiver_address: parcel.receiver_address,
      receiver_phone_no: parcel.receiver_phone_no,
      parcel_name: parcel.parcel_name,
      parcel_type: parcel.parcel_type,
      parcel_weight_in_kg: parcel.parcel_weight_in_kg,
    });
  }

  findnew(parr,delarr){
    for(var i=0;i<parr.length;i++){
      if(!delarr.includes(parr[i])){
        return parr[i]
      }
    }
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
    if(this.isNew){
      await this.loadAll();
      await this.loadAlldel();
      console.log(this.pararr)
      console.log(this.delarr)
      setTimeout(() => {
        this.newid = this.findnew(this.pararr,this.delarr)
        console.log(this.newid)
        this.savedel(this.newid);
      }, 300);
    }else{
      await this.navController.navigateBack('/tabs/home');
    }
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
      sender_email: this.account.email,
      sender_address: this.form.get(['sender_address']).value,
      sender_phone_no: this.form.get(['sender_phone_no']).value,
      receiver_name: this.form.get(['receiver_name']).value,
      receiver_email: this.form.get(['receiver_email']).value,
      receiver_address: this.form.get(['receiver_address']).value,
      receiver_phone_no: this.form.get(['receiver_phone_no']).value,
      parcel_name: this.form.get(['parcel_name']).value,
      parcel_type: this.form.get(['parcel_type']).value,
      parcel_weight_in_kg: this.form.get(['parcel_weight_in_kg']).value,
      status: 'Parcel with Sender',
    };
  }

  loadAll(refresher?) {
    this.parcelService
      .query()
      .pipe(
        filter((res: HttpResponse<Parcel[]>) => res.ok),
        map((res: HttpResponse<Parcel[]>) => res.body)
      )
      .subscribe(
        (response: Parcel[]) => {
          for(var i = 0;i<response?.length;i++){
            this.pararr.push(response[i].id)
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

  loadAlldel(refresher?) {
    this.deliveryService
      .query()
      .pipe(
        filter((res: HttpResponse<Delivery[]>) => res.ok),
        map((res: HttpResponse<Delivery[]>) => res.body)
      )
      .subscribe(
        (response: Delivery[]) => {
          for(var i = 0;i<response?.length;i++){
            this.delarr.push(response[i].parcel_id)
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

  private createFromFormdel(newid): Delivery {
    return {
      ...new Delivery(),
      id: null || undefined,
      parcel_id: newid,
      driver_id: null,
      request_time: new Date().toISOString().slice(0, 19) + 'Z',
      assigned_time: null,
      estimated_time: null,
      ended_time: null,
      star_received: null,
    };
  }

  savedel(newid) {
    this.isSaving = true;
    const delivery = this.createFromFormdel(newid);
    this.subscribeToSaveResponsedel(this.deliveryService.create(delivery));
  }

  protected subscribeToSaveResponsedel(result: Observable<HttpResponse<Delivery>>) {
    result.subscribe(
      (res: HttpResponse<Delivery>) => this.onSaveSuccessdel(res),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  async onSaveSuccessdel(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `Delivery ${action} successfully.`, duration: 2000, position: 'middle' });
    await toast.present();
    await this.navController.navigateBack('/tabs/home');
  }
}
