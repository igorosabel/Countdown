import { CountdownInterface } from '@interfaces/countdown.interfaces';
import { RemainingInterface } from './../interfaces/countdown.interfaces';

export default class Countdown {
  finished: boolean = true;
  obj: Date | null = null;
  check: number | null = null;
  endDateStr: string | null = null;

  constructor(
    public id: number | null = null,
    public endDate: number | null = null,
    public createdAt: string | null = null
  ) {}

  startCheck(): void {
    if (this.endDate !== null) {
      this.obj = new Date(this.endDate * 1000);

      this.endDateStr = `${this.withZero(this.obj.getDate())}-${this.withZero(
        this.obj.getMonth() + 1
      )}-${this.obj.getFullYear()} ${this.withZero(
        this.obj.getHours()
      )}:${this.withZero(this.obj.getMinutes())}`;

      if (this.obj.getTime() > new Date().getTime()) {
        this.finished = false;
      }
    }
  }

  get remaining(): string {
    if (this.obj !== null && this.check !== null && !this.finished) {
      const distance: number = this.obj.getTime() - this.check;

      if (distance > 0) {
        return this.formatTime(this.getTime(distance));
      } else {
        this.finished = true;
      }
    }
    return ':)';
  }

  getTime(distance: number): RemainingInterface {
    const days: number = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes: number = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds: number = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  withZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  formatTime(result: RemainingInterface): string {
    if (result.days < 20) {
      result.hours += result.days * 24;
      return `${result.hours}:${this.withZero(result.minutes)}:${this.withZero(
        result.seconds
      )}`;
    }
    return `${result.days}d ${result.hours}:${this.withZero(
      result.minutes
    )}:${this.withZero(result.seconds)}`;
  }

  fromInterface(c: CountdownInterface): Countdown {
    this.id = c.id;
    this.endDate = c.endDate;
    this.createdAt = c.createdAt;

    this.startCheck();

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
