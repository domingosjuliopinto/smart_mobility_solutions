import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FleetFormService } from './fleet-form.service';
import { FleetService } from '../service/fleet.service';
import { IFleet } from '../fleet.model';

import { FleetUpdateComponent } from './fleet-update.component';

describe('Fleet Management Update Component', () => {
  let comp: FleetUpdateComponent;
  let fixture: ComponentFixture<FleetUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fleetFormService: FleetFormService;
  let fleetService: FleetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FleetUpdateComponent],
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
      .overrideTemplate(FleetUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FleetUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fleetFormService = TestBed.inject(FleetFormService);
    fleetService = TestBed.inject(FleetService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fleet: IFleet = { id: 456 };

      activatedRoute.data = of({ fleet });
      comp.ngOnInit();

      expect(comp.fleet).toEqual(fleet);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFleet>>();
      const fleet = { id: 123 };
      jest.spyOn(fleetFormService, 'getFleet').mockReturnValue(fleet);
      jest.spyOn(fleetService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fleet });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fleet }));
      saveSubject.complete();

      // THEN
      expect(fleetFormService.getFleet).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fleetService.update).toHaveBeenCalledWith(expect.objectContaining(fleet));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFleet>>();
      const fleet = { id: 123 };
      jest.spyOn(fleetFormService, 'getFleet').mockReturnValue({ id: null });
      jest.spyOn(fleetService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fleet: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fleet }));
      saveSubject.complete();

      // THEN
      expect(fleetFormService.getFleet).toHaveBeenCalled();
      expect(fleetService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFleet>>();
      const fleet = { id: 123 };
      jest.spyOn(fleetService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fleet });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fleetService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
