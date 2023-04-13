import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFleet, NewFleet } from '../fleet.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFleet for edit and NewFleetFormGroupInput for create.
 */
type FleetFormGroupInput = IFleet | PartialWithRequiredKeyOf<NewFleet>;

type FleetFormDefaults = Pick<NewFleet, 'id'>;

type FleetFormGroupContent = {
  id: FormControl<IFleet['id'] | NewFleet['id']>;
  driver_name: FormControl<IFleet['driver_name']>;
  driver_email: FormControl<IFleet['driver_email']>;
  driver_address: FormControl<IFleet['driver_address']>;
  driver_phone_no: FormControl<IFleet['driver_phone_no']>;
  vehicle_plate_no: FormControl<IFleet['vehicle_plate_no']>;
  vehicle_type: FormControl<IFleet['vehicle_type']>;
  vehicle_status: FormControl<IFleet['vehicle_status']>;
};

export type FleetFormGroup = FormGroup<FleetFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FleetFormService {
  createFleetFormGroup(fleet: FleetFormGroupInput = { id: null }): FleetFormGroup {
    const fleetRawValue = {
      ...this.getFormDefaults(),
      ...fleet,
    };
    return new FormGroup<FleetFormGroupContent>({
      id: new FormControl(
        { value: fleetRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      driver_name: new FormControl(fleetRawValue.driver_name, {
        validators: [Validators.required],
      }),
      driver_email: new FormControl(fleetRawValue.driver_email, {
        validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')],
      }),
      driver_address: new FormControl(fleetRawValue.driver_address, {
        validators: [Validators.required],
      }),
      driver_phone_no: new FormControl(fleetRawValue.driver_phone_no, {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('[0-9]+')],
      }),
      vehicle_plate_no: new FormControl(fleetRawValue.vehicle_plate_no),
      vehicle_type: new FormControl(fleetRawValue.vehicle_type, {
        validators: [Validators.required],
      }),
      vehicle_status: new FormControl(fleetRawValue.vehicle_status, {
        validators: [Validators.required],
      }),
    });
  }

  getFleet(form: FleetFormGroup): IFleet | NewFleet {
    return form.getRawValue() as IFleet | NewFleet;
  }

  resetForm(form: FleetFormGroup, fleet: FleetFormGroupInput): void {
    const fleetRawValue = { ...this.getFormDefaults(), ...fleet };
    form.reset(
      {
        ...fleetRawValue,
        id: { value: fleetRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FleetFormDefaults {
    return {
      id: null,
    };
  }
}
