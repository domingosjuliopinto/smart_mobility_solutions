import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IParcel, NewParcel } from '../parcel.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IParcel for edit and NewParcelFormGroupInput for create.
 */
type ParcelFormGroupInput = IParcel | PartialWithRequiredKeyOf<NewParcel>;

type ParcelFormDefaults = Pick<NewParcel, 'id'>;

type ParcelFormGroupContent = {
  id: FormControl<IParcel['id'] | NewParcel['id']>;
  sender_name: FormControl<IParcel['sender_name']>;
  sender_email: FormControl<IParcel['sender_email']>;
  sender_address: FormControl<IParcel['sender_address']>;
  sender_phone_no: FormControl<IParcel['sender_phone_no']>;
  receiver_name: FormControl<IParcel['receiver_name']>;
  receiver_email: FormControl<IParcel['receiver_email']>;
  receiver_address: FormControl<IParcel['receiver_address']>;
  receiver_phone_no: FormControl<IParcel['receiver_phone_no']>;
  parcel_name: FormControl<IParcel['parcel_name']>;
  parcel_type: FormControl<IParcel['parcel_type']>;
  parcel_weight_in_kg: FormControl<IParcel['parcel_weight_in_kg']>;
  status: FormControl<IParcel['status']>;
};

export type ParcelFormGroup = FormGroup<ParcelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ParcelFormService {
  createParcelFormGroup(parcel: ParcelFormGroupInput = { id: null }): ParcelFormGroup {
    const parcelRawValue = {
      ...this.getFormDefaults(),
      ...parcel,
    };
    return new FormGroup<ParcelFormGroupContent>({
      id: new FormControl(
        { value: parcelRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      sender_name: new FormControl(parcelRawValue.sender_name, {
        validators: [Validators.required],
      }),
      sender_email: new FormControl(parcelRawValue.sender_email, {
        validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')],
      }),
      sender_address: new FormControl(parcelRawValue.sender_address, {
        validators: [Validators.required],
      }),
      sender_phone_no: new FormControl(parcelRawValue.sender_phone_no, {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('[0-9]+')],
      }),
      receiver_name: new FormControl(parcelRawValue.receiver_name, {
        validators: [Validators.required],
      }),
      receiver_email: new FormControl(parcelRawValue.receiver_email, {
        validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')],
      }),
      receiver_address: new FormControl(parcelRawValue.receiver_address, {
        validators: [Validators.required],
      }),
      receiver_phone_no: new FormControl(parcelRawValue.receiver_phone_no, {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('[0-9]+')],
      }),
      parcel_name: new FormControl(parcelRawValue.parcel_name, {
        validators: [Validators.required],
      }),
      parcel_type: new FormControl(parcelRawValue.parcel_type, {
        validators: [Validators.required],
      }),
      parcel_weight_in_kg: new FormControl(parcelRawValue.parcel_weight_in_kg, {
        validators: [Validators.required],
      }),
      status: new FormControl(parcelRawValue.status, {
        validators: [Validators.required],
      }),
    });
  }

  getParcel(form: ParcelFormGroup): IParcel | NewParcel {
    return form.getRawValue() as IParcel | NewParcel;
  }

  resetForm(form: ParcelFormGroup, parcel: ParcelFormGroupInput): void {
    const parcelRawValue = { ...this.getFormDefaults(), ...parcel };
    form.reset(
      {
        ...parcelRawValue,
        id: { value: parcelRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ParcelFormDefaults {
    return {
      id: null,
    };
  }
}
