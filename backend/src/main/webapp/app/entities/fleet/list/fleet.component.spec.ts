import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FleetService } from '../service/fleet.service';

import { FleetComponent } from './fleet.component';

describe('Fleet Management Component', () => {
  let comp: FleetComponent;
  let fixture: ComponentFixture<FleetComponent>;
  let service: FleetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'fleet', component: FleetComponent }]), HttpClientTestingModule],
      declarations: [FleetComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(FleetComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FleetComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FleetService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.fleets?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to fleetService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getFleetIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getFleetIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
