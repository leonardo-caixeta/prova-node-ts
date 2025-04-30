type TBillet = {
  id: number;
  valueToPay: number;
  status: string;
  payDay: Date;
  dayUserPaid: Date | null;
  userId: number;
};
