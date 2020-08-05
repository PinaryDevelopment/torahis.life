import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

/* tslint:disable-next-line:no-any */
declare let gapi: any;

export interface IUser {
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl = '';
  user?: IUser;
  authorizationToken?: string;

  constructor(private httpClient: HttpClient, private ngZone: NgZone) {
    this.loadGapiScript()
        .pipe(
          switchMap(() => this.loadClient()),
          switchMap(() => this.initializeClient()),
          take(1)
        )
        .subscribe(
          next => console.log('next: ', next),
          error => console.log('error: ', error),
          () => console.log('complete.')
        );
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
            clientId: 'xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.xxxx.xxxxxxxxxxxxxxxxx.xxx',
            scope: 'email profile openid',
            cookiepolicy: 'single_host_origin'
        })
        .then(() => clientIsInitialized.next());
    return clientIsInitialized.asObservable();
  }

  login(): Observable<unknown> {
    const sub = new Subject<unknown>();
    gapi.auth2
        .getAuthInstance()
        .signIn({
          prompt: 'select_account'
        })
        /* currentUser can also be retrieved through gapi.auth2.getAuthInstance().currentUser.get() */
        .then((currentUser: { getAuthResponse: (b: boolean) => { id_token: string } }) => {
          const backendToken = currentUser.getAuthResponse(true)
                                          .id_token;
          this.httpClient
              .post<{ user: IUser, authorizationToken: string }>('http://localhost:613/api/auth/login', backendToken)
              .pipe(take(1))
              .subscribe(({ user, authorizationToken }) =>
                this.ngZone.run(() => {
                  this.user = user;
                  this.authorizationToken = authorizationToken;
                  this.isLoggedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
                  sub.next();
                }));
        })
        /* tslint:disable-next-line:no-any */
        .catch((err: any) => sub.error(err));
    return sub.asObservable();
  }

   logout(): void {
    this.isLoggedIn = false;
  }
}
