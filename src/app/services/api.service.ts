import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import { CountdownsResult } from '@interfaces/countdown.interfaces';
import { StatusResult } from '@interfaces/interfaces';
import {
  LoginData,
  LoginResult,
  RegisterData,
} from '@interfaces/user.interfaces';
import { Observable } from 'rxjs';

@Injectable()
export default class ApiService {
  private http: HttpClient = inject(HttpClient);
  apiUrl: string = environment.apiUrl;

  register(data: RegisterData): Observable<LoginResult> {
    return this.http.post<LoginResult>(environment.apiUrl + 'register', data);
  }

  login(data: LoginData): Observable<LoginResult> {
    return this.http.post<LoginResult>(this.apiUrl + 'login', data);
  }

  getCountdowns(): Observable<CountdownsResult> {
    return this.http.post<CountdownsResult>(this.apiUrl + 'get-countdowns', {});
  }

  saveCountdown(endDate: number): Observable<StatusResult> {
    return this.http.post<StatusResult>(this.apiUrl + 'save-countdown', {
      endDate,
    });
  }

  deleteCountdown(id: number): Observable<StatusResult> {
    return this.http.post<StatusResult>(this.apiUrl + 'delete-countdown', {
      id,
    });
  }
}
