import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {AlertService, JwtService} from '../services';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private Alert: AlertService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.jwtService.token;

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }
    req = req.clone({setHeaders: headersConfig});
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (400 <= error.status && error.status <= 526) {
            this.Alert.danger(`${error.error.data.email}`);
          }
          return throwError(error);
        })
      );
  }
}
