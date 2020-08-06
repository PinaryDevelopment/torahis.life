import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import * as env from '../../environments/environment';

import { UserProfileService, UserProfile } from '../core/user-profile.service';

declare let gapi: {
  auth2: {
    getAuthInstance: () => {
      signIn: (options: { prompt: 'select_account' }) => Promise<{ getAuthResponse: (b: boolean) => { id_token: string } }>
    }
  },
  client: {
    init: (options: { clientId: string, scope: string, cookiepolicy: string }) => Promise<unknown>
  },
  load: (str: 'client:auth2', callback: () => void) => void
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl = '';
  user: UserProfile | null;
  authorizationToken?: string;

  constructor(
    private httpClient: HttpClient,
    private ngZone: NgZone,
    private userProfileService: UserProfileService
  ) {
    this.user = userProfileService.get();
    this.isLoggedIn = this.user !== null;
  }

  login(): Observable<unknown> {
    return this.loadGapiScript()
               .pipe(
                 switchMap(() => this.loadClient()),
                 switchMap(() => this.initializeClient()),
                 switchMap(() => this.oAuthLogin())
               );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.user = null;
    this.userProfileService.clear();
  }

  private loadGapiScript(): Observable<unknown> {
    if (typeof document !== 'undefined') {
      const scriptHasLoaded = new Subject();

      const scriptElement = document.createElement('script');
      scriptElement.async = true;
      // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/gapi/index.d.ts
      // https://github.com/google/google-api-javascript-client
      scriptElement.src = 'https://apis.google.com/js/client:platform.js?onload=start';
      scriptElement.onload = () => scriptHasLoaded.next();

      document.head.appendChild(scriptElement);
      return scriptHasLoaded.asObservable();
    }

    return throwError('platform is not browser, therefore will not try to load gapi script');
  }

  private loadClient(): Observable<unknown> {
    const clientHasLoaded = new Subject();
    gapi.load('client:auth2', () => clientHasLoaded.next());
    return clientHasLoaded.asObservable();
  }

  private initializeClient(): Observable<unknown> {
    const clientIsInitialized = new Subject();
    gapi.client
        .init({
            clientId: env.environment.auth.google.clientId,
            scope: 'email profile openid',
            cookiepolicy: 'single_host_origin'
        })
        .then(() => clientIsInitialized.next());
    return clientIsInitialized.asObservable();
  }

  private oAuthLogin(): Observable<unknown> {
    const sub = new Subject<unknown>();

    gapi.auth2
        .getAuthInstance()
        .signIn({
          prompt: 'select_account'
        })
        /* currentUser can also be retrieved through gapi.auth2.getAuthInstance().currentUser.get() */
        .then(currentUser => {
          const backendToken = currentUser.getAuthResponse(true)
                                          .id_token;
          this.httpClient
              .post<{ user: UserProfile, authorizationToken: string }>(`${env.environment.baseApisUri}/auth/login`, backendToken)
              .pipe(take(1))
              .subscribe(({ user, authorizationToken }) =>
                this.ngZone.run(() => {
                  this.userProfileService.set(user);
                  this.user = user;
                  this.authorizationToken = authorizationToken;
                  this.isLoggedIn = true; // gapi.auth2.getAuthInstance().isSignedIn.get();
                  sub.next();
                }));
        })
        .catch((err: unknown) => sub.error(err));
    return sub.asObservable();
  }
}
