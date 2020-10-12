import { HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { materialize, delay, dematerialize, mergeMap } from 'rxjs/operators';
import * as data from './data';
import { environment as env } from '../../environments/environment';

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
      case method === 'GET' && this.isMatch(url, `${env.baseApisUri}/audio-media?pageIndex={{placeholder}}&maxPageSize={{placeholder}}&searchTerm={{placeholder}}`):
        const pageIndex = parseInt(queryParams.get('pageIndex') || '0', 10);
        const maxPageSize = parseInt(queryParams.get('maxPageSize') || '25', 10);
        let searchTerm: string | null | undefined = queryParams.get('searchTerm');
        searchTerm = searchTerm ? searchTerm.toLocaleLowerCase() : null;
        const collectionFragment = data.AUDIO_MEDIA_COLLECTION
                                       .filter(media => !searchTerm || media.authorName?.toLocaleLowerCase().includes(searchTerm) || media.title.toLocaleLowerCase().includes(searchTerm))
                                       .slice(pageIndex * maxPageSize, (pageIndex * maxPageSize) + maxPageSize);
        return this.ok(collectionFragment);
      case method === 'GET' && this.isMatch(url, `${env.baseApisUri}/audio-media?id={{placeholder}}`):
        const media = data.AUDIO_MEDIA_COLLECTION
                          .find(a => a.id.toString() === queryParams.get('id'));
        return this.ok(media);
      case method === 'GET' && this.isMatch(url, `${env.baseApisUri}/tags`):
        return this.ok(data.TAG_COLLECTION);
      default:
        return next.handle(req);
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
      (expectedValue, expectedKey) => queryParamKeysMatch = queryParamKeysMatch && actualQueryParams.has(expectedKey)
    );
    return actualUrl.host === expectedUrl.host
      && actualUrl.port === expectedUrl.port
      && actualUrl.pathname === expectedUrl.pathname
      && queryParamKeysMatch;
  }
}

export const apiStubProvider = { provide: HTTP_INTERCEPTORS, useClass: ApiStub, multi: true };
