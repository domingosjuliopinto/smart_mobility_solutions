import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IDelivery, NewDelivery } from '../delivery.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDelivery for edit and NewDeliveryFormGroupInput for create.
 */
type DeliveryFormGroupInput = IDelivery | PartialWithRequiredKeyOf<NewDelivery>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IDelivery | NewDelivery> = Omit<T, 'request_time' | 'assigned_time' | 'estimated_time' | 'ended_time'> & {
  request_time?: string | null;
  assigned_time?: string | null;
  estimated_time?: string | null;
  ended_time?: string | null;
};

type DeliveryFormRawValue = FormValueOf<IDelivery>;

type NewDeliveryFormRawValue = FormValueOf<NewDelivery>;

type DeliveryFormDefaults = Pick<NewDelivery, 'id' | 'request_time' | 'assigned_time' | 'estimated_time' | 'ended_time'>;

type DeliveryFormGroupContent = {
  id: FormControl<DeliveryFormRawValue['id'] | NewDelivery['id']>;
  parcel_id: FormControl<DeliveryFormRawValue['parcel_id']>;
  driver_id: FormControl<DeliveryFormRawValue['driver_id']>;
  request_time: FormControl<DeliveryFormRawValue['request_time']>;
  assigned_time: FormControl<DeliveryFormRawValue['assigned_time']>;
  estimated_time: FormControl<DeliveryFormRawValue['estimated_time']>;
  ended_time: FormControl<DeliveryFormRawValue['ended_time']>;
  star_received: FormControl<DeliveryFormRawValue['star_received']>;
};

export type DeliveryFormGroup = FormGroup<DeliveryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DeliveryFormService {
  createDeliveryFormGroup(delivery: DeliveryFormGroupInput = { id: null }): DeliveryFormGroup {
    const deliveryRawValue = this.convertDeliveryToDeliveryRawValue({
      ...this.getFormDefaults(),
      ...delivery,
    });
    return new FormGroup<DeliveryFormGroupContent>({
      id: new FormControl(
        { value: deliveryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      parcel_id: new FormControl(deliveryRawValue.parcel_id, {
        validators: [Validators.required],
      }),
      driver_id: new FormControl(deliveryRawValue.driver_id),
      request_time: new FormControl(deliveryRawValue.request_time, {
        validators: [Validators.required],
      }),
      assigned_time: new FormControl(deliveryRawValue.assigned_time),
      estimated_time: new FormControl(deliveryRawValue.estimated_time),
      ended_time: new FormControl(deliveryRawValue.ended_time),
      star_received: new FormControl(deliveryRawValue.star_received, {
        validators: [Validators.min(0), Validators.max(5)],
      }),
    });
  }

  getDelivery(form: DeliveryFormGroup): IDelivery | NewDelivery {
    return this.convertDeliveryRawValueToDelivery(form.getRawValue() as DeliveryFormRawValue | NewDeliveryFormRawValue);
  }

  resetForm(form: DeliveryFormGroup, delivery: DeliveryFormGroupInput): void {
    const deliveryRawValue = this.convertDeliveryToDeliveryRawValue({ ...this.getFormDefaults(), ...delivery });
    form.reset(
      {
        ...deliveryRawValue,
        id: { value: deliveryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DeliveryFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      request_time: currentTime,
      assigned_time: currentTime,
      estimated_time: currentTime,
      ended_time: currentTime,
    };
  }

  private convertDeliveryRawValueToDelivery(rawDelivery: DeliveryFormRawValue | NewDeliveryFormRawValue): IDelivery | NewDelivery {
    return {
      ...rawDelivery,
      request_time: dayjs(rawDelivery.request_time, DATE_TIME_FORMAT),
      assigned_time: dayjs(rawDelivery.assigned_time, DATE_TIME_FORMAT),
      estimated_time: dayjs(rawDelivery.estimated_time, DATE_TIME_FORMAT),
      ended_time: dayjs(rawDelivery.ended_time, DATE_TIME_FORMAT),
    };
  }

  private convertDeliveryToDeliveryRawValue(
    delivery: IDelivery | (Partial<NewDelivery> & DeliveryFormDefaults)
  ): DeliveryFormRawValue | PartialWithRequiredKeyOf<NewDeliveryFormRawValue> {
    return {
      ...delivery,
      request_time: delivery.request_time ? delivery.request_time.format(DATE_TIME_FORMAT) : undefined,
      assigned_time: delivery.assigned_time ? delivery.assigned_time.format(DATE_TIME_FORMAT) : undefined,
      estimated_time: delivery.estimated_time ? delivery.estimated_time.format(DATE_TIME_FORMAT) : undefined,
      ended_time: delivery.ended_time ? delivery.ended_time.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
