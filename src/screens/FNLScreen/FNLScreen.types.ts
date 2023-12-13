export type Fnl = {
  error: string;
  lost: lostData[];
  recovered: recData[];
}

export type lostData = {
  description: string;
  where: string;
  photo: string;
  dateCreated: string;
  status: string;
  id: string;
}

export type recData = {
  description: string;
  where: string;
  photo: string;
  dateCreated: string;
  status: string;
  id: string;
}