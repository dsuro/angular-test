import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
      req = req.clone({
            setHeaders: { 
                Authorization: `Bearer ${currentUser.token}`,
                'Content-Type':'application/json'
            }
        });
    }else{
      req=req.clone({
        setHeaders:{
          'Content-Type':'application/json'
        }
      });
    }
    return next.handle(req);
  }
}
