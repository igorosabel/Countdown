export interface CountdownInterface {
  id: number | null;
  endDate: number | null;
  createdAt: string | null;
}

export interface CountdownsResult {
  status: string;
  list: CountdownInterface[];
}
