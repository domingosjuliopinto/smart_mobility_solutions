import { BaseEntity } from 'src/model/base-entity';

export class Fleet implements BaseEntity {
  constructor(
    public id?: number,
    public driver_name?: string,
    public driver_email?: string,
    public driver_address?: string,
    public driver_phone_no?: string,
    public vehicle_plate_no?: string,
    public vehicle_type?: string,
    public vehicle_status?: string
  ) {}
}
