import dayjs from 'dayjs/esm';

import { IDelivery, NewDelivery } from './delivery.model';

export const sampleWithRequiredData: IDelivery = {
  id: 76194,
  parcel_id: 30398,
  request_time: dayjs('2023-04-01T20:44'),
  delivery_status: 'wireless',
};

export const sampleWithPartialData: IDelivery = {
  id: 18248,
  parcel_id: 39066,
  driver_id: 66312,
  request_time: dayjs('2023-04-02T02:28'),
  assigned_time: dayjs('2023-04-01T16:42'),
  estimated_time: dayjs('2023-04-01T16:34'),
  ended_time: dayjs('2023-04-01T18:53'),
  delivery_status: 'EXE Cotton',
};

export const sampleWithFullData: IDelivery = {
  id: 23262,
  parcel_id: 74672,
  driver_id: 63707,
  request_time: dayjs('2023-04-01T17:52'),
  assigned_time: dayjs('2023-04-02T06:35'),
  estimated_time: dayjs('2023-04-01T20:49'),
  ended_time: dayjs('2023-04-01T15:26'),
  star_received: 3,
  delivery_status: 'integrated Gibraltar',
};

export const sampleWithNewData: NewDelivery = {
  parcel_id: 69885,
  request_time: dayjs('2023-04-01T23:15'),
  delivery_status: 'Soap repurpose',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
