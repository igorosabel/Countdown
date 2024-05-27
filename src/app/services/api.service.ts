import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
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
}
