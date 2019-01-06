import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  email: string;
  password: string;
  errorMsg: string;

  constructor(private authService: AuthService) {}

  login() {
    const email = this.email;
    const password = this.password;
    this.authService
      .login(email, password)
      .catch(error => (this.errorMsg = error.message));
  }
}
