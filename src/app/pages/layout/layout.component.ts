import { Component, DoCheck } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.css']
})

export class LayoutComponent implements DoCheck {
  loggedIn;
  name;
  userInfo;
  notSet = true;


  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  ngDoCheck() {
    this.loggedIn = this.authService.loggedIn();

    if (this.loggedIn && this.notSet && this.authService.userId) {
      this.userService.getUser(this.authService.userId)
        .subscribe(
          value => {
            this.userInfo = value;
            this.authService.userInfo = value;
          },
          error => {
            console.log(error);
            this.notSet = true;
          }
        );
      this.notSet = false;
    }
  }

  logout(event) {
    event.preventDefault();

    this.authService
      .logout()
      .subscribe((value) => {
        localStorage.removeItem('token');
      },
        error => {
          console.log(error);
        }
      );
  }
}
