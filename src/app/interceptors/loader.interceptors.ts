import {
  HTTP_INTERCEPTORS, HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {TokenStorageService} from "../_services/token-storage.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService, private spinner: NgxSpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show().then(r => r);
    return next.handle(req).pipe(tap({

      next: (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse)
          this.spinnerHide();
      },
      error: (error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.spinnerHide();
        }
      }
    }));
  }

  spinnerHide() {
    setTimeout(() => {
      this.spinner.hide().then(r => r)
    }, 100)
  }

}

export const loaderInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
];
