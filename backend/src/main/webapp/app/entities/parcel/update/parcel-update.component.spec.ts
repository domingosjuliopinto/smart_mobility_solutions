import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ParcelFormService } from './parcel-form.service';
import { ParcelService } from '../service/parcel.service';
import { IParcel } from '../parcel.model';

import { ParcelUpdateComponent } from './parcel-update.component';

describe('Parcel Management Update Component', () => {
  let comp: ParcelUpdateComponent;
  let fixture: ComponentFixture<ParcelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let parcelFormService: ParcelFormService;
  let parcelService: ParcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ParcelUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ParcelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ParcelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    parcelFormService = TestBed.inject(ParcelFormService);
    parcelService = TestBed.inject(ParcelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const parcel: IParcel = { id: 456 };

      activatedRoute.data = of({ parcel });
      comp.ngOnInit();

      expect(comp.parcel).toEqual(parcel);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParcel>>();
      const parcel = { id: 123 };
      jest.spyOn(parcelFormService, 'getParcel').mockReturnValue(parcel);
      jest.spyOn(parcelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parcel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: parcel }));
      saveSubject.complete();

      // THEN
      expect(parcelFormService.getParcel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(parcelService.update).toHaveBeenCalledWith(expect.objectContaining(parcel));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParcel>>();
      const parcel = { id: 123 };
      jest.spyOn(parcelFormService, 'getParcel').mockReturnValue({ id: null });
      jest.spyOn(parcelService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parcel: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: parcel }));
      saveSubject.complete();

      // THEN
      expect(parcelFormService.getParcel).toHaveBeenCalled();
      expect(parcelService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParcel>>();
      const parcel = { id: 123 };
      jest.spyOn(parcelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parcel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(parcelService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
