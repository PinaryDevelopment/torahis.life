import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
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
        .requestLogin(this.authService.redirectUrl)
        .pipe(take(1))
        .subscribe();
  }

  logout(): void {
    this.authService.logout();
    this.setMessage();
  }
}
