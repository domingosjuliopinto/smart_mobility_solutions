import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFleet } from '../fleet.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../fleet.test-samples';

import { FleetService } from './fleet.service';

const requireRestSample: IFleet = {
  ...sampleWithRequiredData,
};

describe('Fleet Service', () => {
  let service: FleetService;
  let httpMock: HttpTestingController;
  let expectedResult: IFleet | IFleet[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FleetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Fleet', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fleet = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fleet).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Fleet', () => {
      const fleet = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fleet).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Fleet', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Fleet', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Fleet', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFleetToCollectionIfMissing', () => {
      it('should add a Fleet to an empty array', () => {
        const fleet: IFleet = sampleWithRequiredData;
        expectedResult = service.addFleetToCollectionIfMissing([], fleet);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fleet);
      });

      it('should not add a Fleet to an array that contains it', () => {
        const fleet: IFleet = sampleWithRequiredData;
        const fleetCollection: IFleet[] = [
          {
            ...fleet,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFleetToCollectionIfMissing(fleetCollection, fleet);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Fleet to an array that doesn't contain it", () => {
        const fleet: IFleet = sampleWithRequiredData;
        const fleetCollection: IFleet[] = [sampleWithPartialData];
        expectedResult = service.addFleetToCollectionIfMissing(fleetCollection, fleet);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fleet);
      });

      it('should add only unique Fleet to an array', () => {
        const fleetArray: IFleet[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fleetCollection: IFleet[] = [sampleWithRequiredData];
        expectedResult = service.addFleetToCollectionIfMissing(fleetCollection, ...fleetArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fleet: IFleet = sampleWithRequiredData;
        const fleet2: IFleet = sampleWithPartialData;
        expectedResult = service.addFleetToCollectionIfMissing([], fleet, fleet2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fleet);
        expect(expectedResult).toContain(fleet2);
      });

      it('should accept null and undefined values', () => {
        const fleet: IFleet = sampleWithRequiredData;
        expectedResult = service.addFleetToCollectionIfMissing([], null, fleet, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fleet);
      });

      it('should return initial array if no Fleet is added', () => {
        const fleetCollection: IFleet[] = [sampleWithRequiredData];
        expectedResult = service.addFleetToCollectionIfMissing(fleetCollection, undefined, null);
        expect(expectedResult).toEqual(fleetCollection);
      });
    });

    describe('compareFleet', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFleet(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFleet(entity1, entity2);
        const compareResult2 = service.compareFleet(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFleet(entity1, entity2);
        const compareResult2 = service.compareFleet(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFleet(entity1, entity2);
        const compareResult2 = service.compareFleet(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
