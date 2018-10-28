import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {TokenStorage} from './token.storage';
import {tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {LogoutAction} from '../../store/actions/auth-actions';
import {InitialNotificationAction} from '../../store/actions/notification-actions';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router, private store: Store<any>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    if (this.token.getToken() != null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())});
    }

    return next.handle(authReq)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {

            console.log(" all looks good");
            // http response status code
            console.log(event.status);
          }
        }, error => {
          // http response status code
          console.log("----response----");
          console.error("status code:");
          console.error(error.status);
          console.error(error.message);
          console.log("--- end of response---");
          // this.store.dispatch(new LogoutAction());
          // this.token.logout();
          // this.router.navigate(['/']);

        })
      )
  }
}
