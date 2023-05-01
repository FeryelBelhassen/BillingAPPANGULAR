import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

//import auth service
import { AuthService } from '../demo/services/auth.service';
import { LoginComponent } from '../demo/components/auth/login/login.component';

@Injectable({
	providedIn:'root'
})
export class AuthGuard implements CanActivate {

	loggedInStatus : boolean = false;

	constructor(private authService : AuthService, private router: Router) { }
  
	//@ts-ignore
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authService.userValue;
        if (user) {
            return true;
        } else {
            this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }

  /*  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.authService.isLoggedIn) {
          const authorities = route.data.authorities as string[];
          if (!authorities || authorities.length === 0) {
            return true;
          }
          return this.authService.hasAuthority(authorities).pipe(
            tap((hasAuthority) => {
              if (!hasAuthority) {
                this.dialog.open(LoginComponent);
              }
            })
          );
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }*/
 }
    

