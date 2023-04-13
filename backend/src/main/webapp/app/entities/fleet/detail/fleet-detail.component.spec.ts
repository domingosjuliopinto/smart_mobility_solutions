import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FleetDetailComponent } from './fleet-detail.component';

describe('Fleet Management Detail Component', () => {
  let comp: FleetDetailComponent;
  let fixture: ComponentFixture<FleetDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FleetDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ fleet: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(FleetDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FleetDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load fleet on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.fleet).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
