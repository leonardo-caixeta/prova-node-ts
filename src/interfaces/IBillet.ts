interface IBilletCreate {
  valueToPay: number;
  payDay: Date;
  userId: number;
}

interface IBilletUpdate {
  valueToPay?: number;
  status?: string;
  payDay?: Date;
  dayUserPaid?: Date | null;
}
