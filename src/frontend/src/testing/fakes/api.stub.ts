import { HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { materialize, delay, dematerialize, mergeMap } from 'rxjs/operators';
import * as data from './data';
import { environment as env } from '../../environments/environment';
import { UserProfile } from '@core/user-profile.service';

export class ApiStub implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    /* simulate call to server */
    return of(null)
            .pipe(
              mergeMap(() => this.handleRoute(req, next)),
              materialize(),
              delay(500),
              dematerialize()
            );
  }

  private handleRoute(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { method, url } = req;

    console.log('handleRoute: ', url);
    const queryParams = new URL(url).searchParams;

    switch (true) {
      case method === 'GET':
        return this.get(url, queryParams);
      case method === 'POST':
        return this.post(url);
      default:
        return next.handle(req);
    }
  }

  private get(url: string, queryParams: URLSearchParams): Observable<HttpResponse<unknown>> {
    switch (true) {
      case this.isMatch(url, `${env.baseApisUri}/audio-media?pageIndex={{placeholder}}&maxPageSize={{placeholder}}&searchTerm={{placeholder}}`):
        const pageIndex = parseInt(queryParams.get('pageIndex') || '0', 10);
        const maxPageSize = parseInt(queryParams.get('maxPageSize') || '25', 10);
        let searchTerm: string | null | undefined = queryParams.get('searchTerm');
        searchTerm = searchTerm ? searchTerm.toLocaleLowerCase() : null;
        const collectionFragment = data.AUDIO_MEDIA_COLLECTION
                                       .filter(m =>
                                        !searchTerm
                                        || m.authorName?.toLocaleLowerCase().includes(searchTerm)
                                        || m.title.toLocaleLowerCase().includes(searchTerm)
                                       )
                                       .slice(pageIndex * maxPageSize, (pageIndex * maxPageSize) + maxPageSize);
        return this.ok(collectionFragment);
      case this.isMatch(url, `${env.baseApisUri}/audio-media?id={{placeholder}}`):
        const media = data.AUDIO_MEDIA_COLLECTION
                          .find(a => a.id.toString() === queryParams.get('id'));
        return this.ok(media);
      case this.isMatch(url, `${env.baseApisUri}/tags`):
        return this.ok(data.TAG_COLLECTION);
      case this.isMatch(url, `${env.baseApisUri}/auth/state?redirectUrl={{placeholder}}`):
        const redirectUrl = queryParams.get('searchTerm');
        return this.ok(`${this.uuidv4()}|${redirectUrl}`);
      default:
        return of(new HttpResponse());
    }
  }

  private post(url: string/*, queryParams: URLSearchParams*/): Observable<HttpResponse<unknown>> {
    switch (true) {
      case this.isMatch(url, `${env.baseApisUri}/auth/login`):
        return this.ok<UserProfile>({
          avatarUrl: data.USER.picture,
          expires: data.USER.exp,
          firstName: data.USER.given_name,
          fullName: data.USER.name,
          lastName: data.USER.family_name
        });
      default:
        return of(new HttpResponse());
    }
  }

  private ok<T>(body?: T): Observable<HttpResponse<T>> {
    return of(new HttpResponse<T>({ body, status: 200 }));
  }

  private isMatch(url: string, expression: string): boolean {
    const actualUrl = new URL(url);
    const expectedUrl = new URL(expression);
    const actualQueryParams = actualUrl.searchParams;
    const expectedQueryParams = expectedUrl.searchParams;

    let queryParamKeysMatch = true;
    expectedQueryParams.forEach(
      // @ts-ignore
      (expectedValue, expectedKey) =>
        queryParamKeysMatch = queryParamKeysMatch
        && actualQueryParams.has(expectedKey)
      );
    return actualUrl.host === expectedUrl.host
      && actualUrl.port === expectedUrl.port
      && actualUrl.pathname === expectedUrl.pathname
      && queryParamKeysMatch;
  }

  /* https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid#answer-2117523 */
  private uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      /* tslint:disable:no-bitwise */
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      /* tslint:enable:no-bitwise */
      return v.toString(16);
    });
  }
}

export const apiStubProvider = { provide: HTTP_INTERCEPTORS, useClass: ApiStub, multi: true };
