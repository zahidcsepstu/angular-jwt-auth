import {Injectable} from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpStatusCode
} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, of, switchMap, throwError} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {NotificationService} from "../_services/notification.service";
import {AuthService} from "../_services/auth.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {TOKEN_HEADER_KEY} from "./auth.interceptor";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              private notificationService: NotificationService,
              private spinner: NgxSpinnerService,
              private authService: AuthService,
              private tokenService: TokenStorageService,
  ) {
  }

  private handleAuthError(error: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (error.status === 400) {
      if (error?.error?.errors) {
        this.notificationService.showError(this.processModelValidationErrorMessages(error));
      }

      return of(error.message);
    }
    if (error.status === HttpStatusCode.Unauthorized) {
      this.notificationService.showError("Unauthorized");
      return this.authService.refreshToken(this.tokenService.getRefreshToken()).pipe(
        switchMap((result: any) => {
          this.tokenService.saveToken(result.token, result.refreshToken);
          req = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.tokenService.getJwtToken())});
          return next.handle(req);
        }),
        catchError(err => {
          this.notificationService.showError("Session expired");
          this.router.navigate(['/sign-in']).then(r => r);
          return throwError(() => err)
        })
      )
    }
    if (error.status === HttpStatusCode.Forbidden) {
      this.notificationService.showError("Forbidden");

      return of(error.message);
    }

    if (error.status === HttpStatusCode.InternalServerError) {
      this.notificationService.showError("Internal server error");
    }

    return throwError(() => error);
  }

  private processModelValidationErrorMessages(error: HttpErrorResponse) {
    const errors = error?.error?.errors || {};
    let errorMessages = '';
    let count = 0;
    Object.keys(errors).map((key: string) => {
      for (const errorMessage of errors[key]) {
        errorMessages = errorMessages.concat(++count + ') ' + errorMessage + '\n')
      }
    });
    return errorMessages;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => this.handleAuthError(error, req, next)));
  }
}

export const errorInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
];
