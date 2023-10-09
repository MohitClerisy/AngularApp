import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = localStorage.getItem('token');

    if (token) {
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });

      // Send the cloned request with the header to the next handler.
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
