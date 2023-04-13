import { IParcel, NewParcel } from './parcel.model';

export const sampleWithRequiredData: IParcel = {
  id: 81566,
  sender_name: 'Shoes Handmade azure',
  sender_email: '0979@zT-pKH',
  sender_address: 'Handcrafted Wyoming capacitor',
  sender_phone_no: undefined,
  receiver_name: 'Steel Account connecting',
  receiver_email: 'L.fpK@zr',
  receiver_address: 'program',
  receiver_phone_no: undefined,
  parcel_name: 'impactful',
  parcel_type: 'access Accounts Small',
  parcel_weight_in_kg: 47674,
  status: 'USB',
};

export const sampleWithPartialData: IParcel = {
  id: 13696,
  sender_name: 'withdrawal',
  sender_email: 'ev_+@rCEQ',
  sender_address: 'Refined',
  sender_phone_no: undefined,
  receiver_name: 'overriding Director',
  receiver_email: 'Z8N@V',
  receiver_address: 'Franc',
  receiver_phone_no: undefined,
  parcel_name: '(Keeling)',
  parcel_type: 'innovate Passage Frozen',
  parcel_weight_in_kg: 73367,
  status: 'multi-tasking',
};

export const sampleWithFullData: IParcel = {
  id: 23765,
  sender_name: 'Business-focused',
  sender_email: '6u@JG4yh',
  sender_address: 'parse Executive',
  sender_phone_no: undefined,
  receiver_name: 'Auto IB',
  receiver_email: 'V@X',
  receiver_address: 'program Licensed calculating',
  receiver_phone_no: undefined,
  parcel_name: 'Clothing Buckinghamshire revolutionize',
  parcel_type: 'magenta invoice',
  parcel_weight_in_kg: 46697,
  status: 'Open-architected Shores',
};

export const sampleWithNewData: NewParcel = {
  sender_name: 'Identity Loaf',
  sender_email: 'LUTo0@hayXNU',
  sender_address: 'hacking efficient',
  sender_phone_no: undefined,
  receiver_name: 'granular Cambridgeshire',
  receiver_email: '.vW@c',
  receiver_address: 'Cape Account Industrial',
  receiver_phone_no: undefined,
  parcel_name: 'Multi-channelled',
  parcel_type: 'Officer',
  parcel_weight_in_kg: 55941,
  status: 'Tonga Directives Quality',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
