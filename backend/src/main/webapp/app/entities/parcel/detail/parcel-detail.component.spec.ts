import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ParcelDetailComponent } from './parcel-detail.component';

describe('Parcel Management Detail Component', () => {
  let comp: ParcelDetailComponent;
  let fixture: ComponentFixture<ParcelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParcelDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ parcel: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ParcelDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ParcelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load parcel on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.parcel).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
