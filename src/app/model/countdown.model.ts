import { CountdownInterface } from '@interfaces/countdown.interfaces';

export default class Countdown {
  constructor(
    public id: number | null = null,
    public endDate: number | null = null,
    public createdAt: string | null = null
  ) {}

  fromInterface(c: CountdownInterface): Countdown {
    this.id = c.id;
    this.endDate = c.endDate;
    this.createdAt = c.createdAt;

    return this;
  }

  toInterface(): CountdownInterface {
    return {
      id: this.id,
      endDate: this.endDate,
      createdAt: this.createdAt,
    };
  }
}
