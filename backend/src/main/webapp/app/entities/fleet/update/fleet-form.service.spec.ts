import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../fleet.test-samples';

import { FleetFormService } from './fleet-form.service';

describe('Fleet Form Service', () => {
  let service: FleetFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetFormService);
  });

  describe('Service methods', () => {
    describe('createFleetFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFleetFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            driver_name: expect.any(Object),
            driver_email: expect.any(Object),
            driver_address: expect.any(Object),
            driver_phone_no: expect.any(Object),
            vehicle_plate_no: expect.any(Object),
            vehicle_type: expect.any(Object),
            vehicle_status: expect.any(Object),
          })
        );
      });

      it('passing IFleet should create a new form with FormGroup', () => {
        const formGroup = service.createFleetFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            driver_name: expect.any(Object),
            driver_email: expect.any(Object),
            driver_address: expect.any(Object),
            driver_phone_no: expect.any(Object),
            vehicle_plate_no: expect.any(Object),
            vehicle_type: expect.any(Object),
            vehicle_status: expect.any(Object),
          })
        );
      });
    });

    describe('getFleet', () => {
      it('should return NewFleet for default Fleet initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFleetFormGroup(sampleWithNewData);

        const fleet = service.getFleet(formGroup) as any;

        expect(fleet).toMatchObject(sampleWithNewData);
      });

      it('should return NewFleet for empty Fleet initial value', () => {
        const formGroup = service.createFleetFormGroup();

        const fleet = service.getFleet(formGroup) as any;

        expect(fleet).toMatchObject({});
      });

      it('should return IFleet', () => {
        const formGroup = service.createFleetFormGroup(sampleWithRequiredData);

        const fleet = service.getFleet(formGroup) as any;

        expect(fleet).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFleet should not enable id FormControl', () => {
        const formGroup = service.createFleetFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFleet should disable id FormControl', () => {
        const formGroup = service.createFleetFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
