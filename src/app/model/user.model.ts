import { UserInterface } from '@interfaces/user.interfaces';
import Utils from '@shared/utils.class';

export default class User {
  constructor(
    public id: number | null = null,
    public username: string | null = null,
    public pass: string | null = null,
    public conf_pass: string | null = null,
    public token: string | null = null
  ) {}

  public fromInterface(u: UserInterface): User {
    this.id = u.id;
    this.username = Utils.urldecode(u.username);
    this.pass = Utils.urldecode(u.pass);
    this.conf_pass = Utils.urldecode(u.conf_pass);
    this.token = u.token;

    return this;
  }

  toInterface(): UserInterface {
    return {
      id: this.id,
      username: Utils.urlencode(this.username),
      pass: Utils.urlencode(this.pass),
      conf_pass: Utils.urlencode(this.conf_pass),
      token: this.token,
    };
  }
}
