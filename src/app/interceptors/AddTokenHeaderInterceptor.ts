import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AddTokenHeaderInterceptor implements HttpInterceptor {

  private token = localStorage.getItem('token');

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
      // Clone the request to add the new header
      const clonedRequest = req.clone({headers: req.headers.append('Authorization', `Bearer ${this.token}`)});
      // Pass the cloned request instead of the original request to the next handle
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }
}
