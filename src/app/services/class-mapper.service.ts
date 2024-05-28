import { Injectable } from '@angular/core';
import { CountdownInterface } from '@interfaces/countdown.interfaces';
import { UserInterface } from '@interfaces/user.interfaces';
import Countdown from '@model/countdown.model';
import User from '@model/user.model';

@Injectable({
  providedIn: 'root',
})
export default class ClassMapperService {
  getUser(u: UserInterface): User {
    return new User().fromInterface(u);
  }

  getCountdown(c: CountdownInterface): Countdown {
    return new Countdown().fromInterface(c);
  }

  getCountdowns(cs: CountdownInterface[]): Countdown[] {
    return cs.map((c: CountdownInterface): Countdown => {
      return this.getCountdown(c);
    });
  }
}
