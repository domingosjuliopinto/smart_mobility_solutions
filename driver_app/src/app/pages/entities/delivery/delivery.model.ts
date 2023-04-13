import { BaseEntity } from 'src/model/base-entity';

export class Delivery implements BaseEntity {
  constructor(
    public id?: number,
    public parcel_id?: number,
    public driver_id?: number,
    public request_time?: any,
    public assigned_time?: any,
    public estimated_time?: any,
    public ended_time?: any,
    public star_received?: number,
    public delivery_status?: string
  ) {}
}
