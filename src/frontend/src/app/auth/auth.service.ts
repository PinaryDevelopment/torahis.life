declare const ngDevMode: boolean;

import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

import { UserProfileService, UserProfile } from '@core/user-profile.service';
import { Router, UrlTree } from '@angular/router';
import { catchError, delay, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl = '';
  user: UserProfile | null;
  authorizationToken?: string;

  constructor(
    private httpClient: HttpClient,
    private userProfileService: UserProfileService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.user = userProfileService.get();
    this.isLoggedIn = this.user !== null;
  }

  requestLogin(currentUrl: string): Observable<boolean> {
      // TODO: update to call this method. have server create state guid:randomstate(guid for lookup, randomstate for verification)
      return this.httpClient
                 .get<string>(`${environment.baseApisUri}/auth/state?redirectUrl=${currentUrl}`)
                 .pipe(
                   switchMap(state => {
                     const params = new URLSearchParams({
                       scope: 'email profile openid',
                       access_type: 'offline',
                       response_type: 'code',
                       redirect_uri: this.document.location.origin,
                       client_id: environment.auth.google.clientId,
                       state
                     });

                     if (ngDevMode) {
                       return this.login(currentUrl)
                                  .pipe(
                                    map(() => {
                                      this.router.navigate(['/admin']);
                                      return true;
                                    })
                                  );
                     }

                     document.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
                     return of(false).pipe(delay(500));
                   })
                 );
      // const params = new URLSearchParams({
      //   scope: 'email profile openid',
      //   response_type: 'token',
      //   redirect_uri: this.document.location.origin,
      //   client_id: environment.auth.google.clientId
      // });

      // this.document.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  login(currentUrl: string): Observable<boolean | UrlTree> {
    /* ?state=fa83a1c1-8b55-4469-b3f2-4009af572351%7Cnull
       &code=4%2F5gEfTeDBpzh3uqj0wIdWlzxpn2xkP37PBUHpQRvT6KUEU9Iibct_sv6rwNzJof0Zyne92k8_EO4luHI6qxd_lHA
       &scope=email
              profile
              https:%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email
              https:%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile
              openid
       &authuser=0
       &prompt=consent
    */
    const urlTree = this.router.parseUrl(currentUrl);

    return this.httpClient
                .post<UserProfile>(
                  `${environment.baseApisUri}/auth/login`,
                  urlTree.queryParams
                )
                .pipe(
                  map(user => {
                    this.user = user;
                    this.userProfileService.set(user);
                    this.isLoggedIn = true;
                    return this.isLoggedIn;
                  }),
                  catchError(err => {
                    this.logout();
                    return throwError(err);
                  })
                );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.user = null;
    this.userProfileService.clear();
  }
}
