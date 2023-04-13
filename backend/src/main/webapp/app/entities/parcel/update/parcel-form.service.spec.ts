import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../parcel.test-samples';

import { ParcelFormService } from './parcel-form.service';

describe('Parcel Form Service', () => {
  let service: ParcelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParcelFormService);
  });

  describe('Service methods', () => {
    describe('createParcelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createParcelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sender_name: expect.any(Object),
            sender_email: expect.any(Object),
            sender_address: expect.any(Object),
            sender_phone_no: expect.any(Object),
            receiver_name: expect.any(Object),
            receiver_email: expect.any(Object),
            receiver_address: expect.any(Object),
            receiver_phone_no: expect.any(Object),
            parcel_name: expect.any(Object),
            parcel_type: expect.any(Object),
            parcel_weight_in_kg: expect.any(Object),
            status: expect.any(Object),
          })
        );
      });

      it('passing IParcel should create a new form with FormGroup', () => {
        const formGroup = service.createParcelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sender_name: expect.any(Object),
            sender_email: expect.any(Object),
            sender_address: expect.any(Object),
            sender_phone_no: expect.any(Object),
            receiver_name: expect.any(Object),
            receiver_email: expect.any(Object),
            receiver_address: expect.any(Object),
            receiver_phone_no: expect.any(Object),
            parcel_name: expect.any(Object),
            parcel_type: expect.any(Object),
            parcel_weight_in_kg: expect.any(Object),
            status: expect.any(Object),
          })
        );
      });
    });

    describe('getParcel', () => {
      it('should return NewParcel for default Parcel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createParcelFormGroup(sampleWithNewData);

        const parcel = service.getParcel(formGroup) as any;

        expect(parcel).toMatchObject(sampleWithNewData);
      });

      it('should return NewParcel for empty Parcel initial value', () => {
        const formGroup = service.createParcelFormGroup();

        const parcel = service.getParcel(formGroup) as any;

        expect(parcel).toMatchObject({});
      });

      it('should return IParcel', () => {
        const formGroup = service.createParcelFormGroup(sampleWithRequiredData);

        const parcel = service.getParcel(formGroup) as any;

        expect(parcel).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IParcel should not enable id FormControl', () => {
        const formGroup = service.createParcelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewParcel should disable id FormControl', () => {
        const formGroup = service.createParcelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
