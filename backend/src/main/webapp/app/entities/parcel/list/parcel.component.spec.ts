import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ParcelService } from '../service/parcel.service';

import { ParcelComponent } from './parcel.component';

describe('Parcel Management Component', () => {
  let comp: ParcelComponent;
  let fixture: ComponentFixture<ParcelComponent>;
  let service: ParcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'parcel', component: ParcelComponent }]), HttpClientTestingModule],
      declarations: [ParcelComponent],
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
      .overrideTemplate(ParcelComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ParcelComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ParcelService);

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
    expect(comp.parcels?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to parcelService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getParcelIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getParcelIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
