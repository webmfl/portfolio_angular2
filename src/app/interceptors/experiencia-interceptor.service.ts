import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaInterceptorService implements HttpInterceptor {
  
  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReq= req;
    const token=this.tokenService.getToken();
   
    if(token!=null) {
      intReq=req.clone({
        setHeaders: {
        authorization: `Bearer ${token}`
        }});
     
    }
    
    return next.handle(intReq);
  }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ExperienciaInterceptorService, multi: true}];
