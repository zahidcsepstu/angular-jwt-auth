import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpResponse
} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        event = event.clone({body: ResponseInterceptor.modifyBody(event.body)});
      }
      return event;
    }));
  }


  private static modifyBody(body: any) {
    if (body && body.content)
      return body.content;
    else
      return body;
  }
}

export const responseInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true}
];
