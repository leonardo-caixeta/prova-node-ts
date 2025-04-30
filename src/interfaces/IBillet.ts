export interface IBilletDTO {
  valueToPay: number;
  status: string;
  payDay: Date;
  dayUserPaid: Date | null;
  userId: number;
}

export interface IBilletCreate {
  valueToPay: number;
  payDay: Date;
  userId: number;
}

export interface IBilletUpdate {
  valueToPay?: number;
  status?: string;
  payDay?: Date;
  dayUserPaid?: Date | null;
}

export interface GetBillet extends IBilletDTO {
  id: number;
}
