export interface IReservation {
  id: number;
  name: string;
  phone: string;
  guestsCount: number;
  date: string;
  timeStart: number;
  timeEnd: number;
  duration?: number;
  tableId: number;
  status: 'ACTIVE' | 'PENDING' | 'CANCELED';
}

export interface IReservationTime {
  title: string;
  value: number;
  disabled?: boolean;
}
