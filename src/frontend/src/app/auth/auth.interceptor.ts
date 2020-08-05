import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  /* tslint:disable-next-line:no-any */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.authorizationToken) {
      return next.handle(
        req.clone({
          headers: new HttpHeaders({
            Authorization: this.auth.authorizationToken
          })
        })
      );
    }

    return next.handle(req);
  }
}
