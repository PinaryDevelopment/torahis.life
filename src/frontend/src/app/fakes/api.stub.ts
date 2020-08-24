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

    switch (true) {
      case method === 'GET' && this.isMatch(url, `${env.baseApisUri}/audio-media?pageIndex={{placeholder}}&maxPageSize={{placeholder}}`):
        const queryParams = new URL(url).searchParams;
        const pageIndex = parseInt(queryParams.get('pageIndex') || '0', 10);
        const maxPageSize = parseInt(queryParams.get('maxPageSize') || '25', 10);
        const collectionFragment = data.AUDIO_MEDIA_COLLECTION
                                       .slice(pageIndex * maxPageSize, (pageIndex * maxPageSize) + maxPageSize);
        return this.ok(collectionFragment);
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

    return actualUrl.host === expectedUrl.host
      && actualUrl.port === expectedUrl.port
      && actualUrl.pathname == expectedUrl.pathname;
  }
}

export const apiStubProvider = { provide: HTTP_INTERCEPTORS, useClass: ApiStub, multi: true }
