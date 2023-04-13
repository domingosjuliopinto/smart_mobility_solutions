export interface IParcel {
  id: number;
  sender_name?: string | null;
  sender_email?: string | null;
  sender_address?: string | null;
  sender_phone_no?: string | null;
  receiver_name?: string | null;
  receiver_email?: string | null;
  receiver_address?: string | null;
  receiver_phone_no?: string | null;
  parcel_name?: string | null;
  parcel_type?: string | null;
  parcel_weight_in_kg?: number | null;
  status?: string | null;
}

export type NewParcel = Omit<IParcel, 'id'> & { id: null };
