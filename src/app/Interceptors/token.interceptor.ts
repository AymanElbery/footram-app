// token.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Exclude the login request
    if (req.url.includes('/login') || req.url.includes('/validate-login')) {
      return next.handle(req);
    }

    // Retrieve the token from storage (localStorage, sessionStorage, etc.)
    let token = localStorage.getItem('token');
    if (!token) {
      return next.handle(req);
    }
    token = token.substring(1, token.length-1);
    // Clone the request and add the token to the headers
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(clonedRequest);
  }
}
