 export type Data = {
  id: string;
  disabledDates: string;
  idReservationType: string;
  
}

export type NewTime = {
  time: string;
  disable: boolean;
}

export type DisabledProps = {
  error: string;
  data: Data[];
}

export type Times = {
  error: string;
  data: NewTime[]
}

export type DataTimes = {
  timeSlots: string;
  id: string;
}

export type Saved = {
  error: string;
  data: ReservSaved[];
}

export type ReservSaved = {
  idReservationsType: string;
  date: string;
  times: string;
}