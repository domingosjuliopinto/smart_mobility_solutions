import { BaseEntity } from 'src/model/base-entity';

export class Parcel implements BaseEntity {
  constructor(
    public id?: number,
    public sender_name?: string,
    public sender_email?: string,
    public sender_address?: string,
    public sender_phone_no?: string,
    public receiver_name?: string,
    public receiver_email?: string,
    public receiver_address?: string,
    public receiver_phone_no?: string,
    public parcel_name?: string,
    public parcel_type?: string,
    public parcel_weight_in_kg?: number,
    public status?: string
  ) {}
}
