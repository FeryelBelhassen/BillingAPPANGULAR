import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../demo/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const MyToken = this.authenticationService.getToken();
        if(MyToken){
            request = request.clone({
                setHeaders: {Authorization: `Bearer ${MyToken}`}
            });

        }

        return next.handle(request).pipe(catchError((err:any) => {
            if (err instanceof HttpErrorResponse) {
                if(err.status === 401){
                    this.router.navigate(['auth/login']);
                }
            }
            return throwError(()=> new Error ("Some other error"));

             
    })
        );
}
}