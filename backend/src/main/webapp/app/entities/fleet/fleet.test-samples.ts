import { IFleet, NewFleet } from './fleet.model';

export const sampleWithRequiredData: IFleet = {
  id: 39912,
  driver_name: 'Communications',
  driver_email: 'c_73@ywD2CQ',
  driver_address: 'impactful',
  driver_phone_no: undefined,
  vehicle_type: 'enterprise',
  vehicle_status: 'collaborative',
};

export const sampleWithPartialData: IFleet = {
  id: 57288,
  driver_name: 'initiatives',
  driver_email: 'a@QDl',
  driver_address: 'Sleek',
  driver_phone_no: undefined,
  vehicle_type: 'withdrawal Central Fresh',
  vehicle_status: 'capacitor',
};

export const sampleWithFullData: IFleet = {
  id: 64018,
  driver_name: 'Solutions red Denar',
  driver_email: 'n@88Px',
  driver_address: 'Re-engineered',
  driver_phone_no: undefined,
  vehicle_plate_no: 'Wooden',
  vehicle_type: 'Tennessee',
  vehicle_status: 'sensor zero',
};

export const sampleWithNewData: NewFleet = {
  driver_name: 'actuating synthesize coherent',
  driver_email: 'M@TS5D-',
  driver_address: 'Soft backing system',
  driver_phone_no: undefined,
  vehicle_type: 'navigate multi-byte',
  vehicle_status: 'Coordinator',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
