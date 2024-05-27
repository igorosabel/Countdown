export default class Utils {
  static urldecode(str: string | null): string {
    if (!str) {
      return '';
    }
    return decodeURIComponent(
      str
        .replace(/\+/g, '%20')
        .replace(/%21/g, '!')
        .replace(/%27/g, "'")
        .replace(/%28/g, '(')
        .replace(/%29/g, ')')
        .replace(/%2A/g, '*')
        .replace(/%7E/g, '~')
    );
  }

  static urlencode(str: string | null): string | null {
    if (str === null) {
      return null;
    }
    return encodeURIComponent(str)
      .replace(/%20/g, '+')
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/~/g, '%7E');
  }

  static bytesToSize(bytes: number): string {
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return 'n/a';
    }
    const i: number = Math.floor(Math.log(bytes) / Math.log(1024));
    if (i === 0) {
      return `${bytes} ${sizes[i]})`;
    }
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  }

  static isEmailValid(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  static getDateFromString(str: string | null): Date | null {
    if (str === null) {
      return null;
    }
    let day: number = 0;
    let month: number = 0;
    let year: number = 0;
    let hour: number = 0;
    let minutes: number = 0;
    let seconds: number = 0;

    if (str.includes(' ')) {
      const strParts: string[] = str.split(' ');
      const dateParts: string[] = strParts[0].split('-');
      const hourParts: string[] = strParts[1].split(':');
      day = parseInt(dateParts[2]);
      month = parseInt(dateParts[1]) - 1;
      year = parseInt(dateParts[0]);
      hour = parseInt(hourParts[0]);
      minutes = parseInt(hourParts[1]);
      seconds = parseInt(hourParts[2]);
    } else {
      const dateParts: string[] = str.split('-');
      day = parseInt(dateParts[2]);
      month = parseInt(dateParts[1]) - 1;
      year = parseInt(dateParts[0]);
    }

    return new Date(year, month, day, hour, minutes, seconds);
  }

  static getStringFromDate(
    date: Date | null,
    withHours: boolean = false
  ): string | null {
    if (date === null) {
      return null;
    }
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();

    const dateStr: string = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;

    if (!withHours) {
      return dateStr;
    }

    const hour: number = date.getHours();
    const minutes: number = date.getMinutes();
    const seconds: number = date.getSeconds();

    return (
      dateStr +
      ` ${hour < 10 ? '0' + hour : hour}:${
        minutes < 10 ? '0' + minutes : minutes
      }:${seconds < 10 ? '0' + seconds : seconds}`
    );
  }
}
