import dayjs from 'dayjs/esm';

import { IDelivery, NewDelivery } from './delivery.model';

export const sampleWithRequiredData: IDelivery = {
  id: 76194,
  parcel_id: 30398,
  request_time: dayjs('2023-04-01T20:44'),
};

export const sampleWithPartialData: IDelivery = {
  id: 56350,
  parcel_id: 57806,
  request_time: dayjs('2023-04-01T15:55'),
  assigned_time: dayjs('2023-04-02T13:50'),
  estimated_time: dayjs('2023-04-02T09:39'),
  star_received: 2,
};

export const sampleWithFullData: IDelivery = {
  id: 66312,
  parcel_id: 48174,
  driver_id: 88907,
  request_time: dayjs('2023-04-01T16:34'),
  assigned_time: dayjs('2023-04-01T18:53'),
  estimated_time: dayjs('2023-04-02T05:35'),
  ended_time: dayjs('2023-04-01T16:50'),
  star_received: 3,
};

export const sampleWithNewData: NewDelivery = {
  parcel_id: 97748,
  request_time: dayjs('2023-04-02T11:01'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
