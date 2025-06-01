import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";


export interface RegisterRequest{
  name: String;
  username : String;
  password : string;
  role : string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  role: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post('${this.apiUrl}/register', data)
      .pipe(
        catchError(this.handleError)
      );

  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('${this.apiUrl}/login', data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() =>
      error.error instanceof ErrorEvent ? error.error.message : error.error
    );
  }
}
