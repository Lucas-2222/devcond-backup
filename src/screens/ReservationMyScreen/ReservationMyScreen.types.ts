export type MyReservations = {
  error: string;
  data: MyReserv[];
}

export type MyReserv = {
  idReservationType?: string;
  date: string;
  time: string;
  title: string;
  cover: string;
  dates?: string;
  id: string;
} 

export type RemoveReserv = {
  error: '';
  id: string;
}