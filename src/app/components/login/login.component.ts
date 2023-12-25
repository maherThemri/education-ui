import { Component, OnInit } from '@angular/core';
import { request } from 'http';
import { AuthenticationRequest } from 'src/app/models/authenticationRequest.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authRequest: AuthenticationRequest = {};
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }
  login() {
    this.authService.authenticate(this.authRequest).subscribe({
      next: (data) => {
        console.log("here token : ", data);
      }
    });
  }

}
