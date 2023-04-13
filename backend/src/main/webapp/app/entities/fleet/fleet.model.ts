export interface IFleet {
  id: number;
  driver_name?: string | null;
  driver_email?: string | null;
  driver_address?: string | null;
  driver_phone_no?: string | null;
  vehicle_plate_no?: string | null;
  vehicle_type?: string | null;
  vehicle_status?: string | null;
}

export type NewFleet = Omit<IFleet, 'id'> & { id: null };
