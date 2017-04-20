import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _toast: ToastrService,
    private _translate: TranslateService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._auth.isLoggedIn()
      .do(x => {
        if (!x) {
          this._router.navigate(['/login']);
          this._translate.get('notifications.errors.authGuard')
            .first()
            .subscribe(message => {
              this._toast.error(message);
            });
        }
      });
  }
}
