import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  error: any;
  userInfo;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {
    this.form = fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null,
        [
          Validators.required, Validators.minLength(6), Validators.maxLength(20)
        ]
      ]
      });
  }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  signUp(data) {
    this.authService.signUp(data)
      .subscribe(
        (value) => {
          this.userInfo = value;
          localStorage.setItem('token', this.userInfo.token);
          this.router.navigate(['/dashboard']);
        },
        error => this.error = error
      );
  }
}
