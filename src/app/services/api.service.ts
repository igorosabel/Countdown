import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import { LoginData, LoginResult } from '@interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable()
export default class ApiService {
  private http: HttpClient = inject(HttpClient);
  apiUrl: string = environment.apiUrl;

  login(data: LoginData): Observable<LoginResult> {
    return this.http.post<LoginResult>(this.apiUrl + 'login', data);
  }
}
