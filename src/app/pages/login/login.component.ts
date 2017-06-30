import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit{
  form: FormGroup;
  private error;
  private username = '';
  private password = '';
  private userInfo;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {
    this.form = fb.group({
      'username': [null, [Validators.required, Validators.minLength(3)]],
      'password': [
        null, Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ])
      ]
    });
  }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(data) {
    this.authService
      .login(data)
      .subscribe(
        (res) => {
          console.log(res);
          this.userInfo = res;
          localStorage.setItem('token', this.userInfo.token);
          this.router.navigate(['/dashboard']);
        },
        error => this.error = error
      );
  }
}
