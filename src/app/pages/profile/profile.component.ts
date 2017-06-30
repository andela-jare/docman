import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
@Component({
  templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit, OnChanges {
  userId;
  userInfo;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    // this.userInfo = this.authService.userInfo;
  }

  ngOnInit() {
    // this.userService.getUser(this.authService.userId)
    //   .subscribe(

    //   );
    // console.log(this.authService.userInfo);
    this.userInfo = this.authService.userInfo;
  }

  ngOnChanges() {
    console.log('yes');
    this.userInfo = this.authService.userInfo;
  }
}
