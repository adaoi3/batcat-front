import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AddTokenHeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    if (token) {
      // Clone the request to add the new header
      const clonedRequest = req.clone({headers: req.headers.append('Authorization', `Bearer ${token}`)});
      // Pass the cloned request instead of the original request to the next handle
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }
}
