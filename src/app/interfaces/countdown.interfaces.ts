export interface CountdownInterface {
  id: number | null;
  endDate: number | null;
  createdAt: string | null;
}

export interface CountdownsResult {
  status: string;
  list: CountdownInterface[];
}

export interface CountdownValidation {
  date: boolean;
  hour: boolean;
  hourInvalid: boolean;
  minutes: boolean;
  minutesInvalid: boolean;
}

export interface RemainingInterface {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
