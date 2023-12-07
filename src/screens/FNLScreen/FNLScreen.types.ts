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
}

export type recData = {
  description: string;
  where: string;
  photo: string;
  dateCreated: string;
  descriptionRec: string;
  whereRec: string;
  photoRec: string;
  dateCreatedRec: string;
}