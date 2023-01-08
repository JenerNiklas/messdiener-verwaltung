import { HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!request.headers.has("Content-Type")) {
      request = request.clone({headers: request.headers.set("Content-Type", "application/json")});
    }
    
    const token = this.authService.getToken();
    if(token != null)
    {
      request = request.clone({headers: request.headers.set("Accept", "application/json")})
        .clone({setHeaders: {
          Authorization: token.toString()
      }});
    }
    
    return next.handle(request);
  }
}
