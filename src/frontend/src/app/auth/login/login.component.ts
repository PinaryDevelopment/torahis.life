import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'pd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  message = '';

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage(): void {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login(): void {
    this.message = 'Trying to log in ...';

    this.authService
        .login()
        .subscribe(() => {
          this.setMessage();
          if (this.authService.isLoggedIn) {
            this.router.navigate([this.authService.redirectUrl]);
          }
        });
  }

  logout(): void {
    this.authService.logout();
    this.setMessage();
  }
}
