import dayjs from 'dayjs/esm';

export interface IDelivery {
  id: number;
  parcel_id?: number | null;
  driver_id?: number | null;
  request_time?: dayjs.Dayjs | null;
  assigned_time?: dayjs.Dayjs | null;
  estimated_time?: dayjs.Dayjs | null;
  ended_time?: dayjs.Dayjs | null;
  star_received?: number | null;
}

export type NewDelivery = Omit<IDelivery, 'id'> & { id: null };
