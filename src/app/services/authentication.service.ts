import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../models/authenticationRequest.model';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../models/authenticationResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiURL: string = 'http://localhost:8080/auth';
  constructor(private http: HttpClient) { }
  authenticate(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post(this.apiURL + "/authenticate", request);
  }
}
