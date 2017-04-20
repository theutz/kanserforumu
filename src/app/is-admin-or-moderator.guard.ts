import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class IsAdminOrModeratorGuard implements CanActivate {

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _translate: TranslateService,
    private _toast: ToastrService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return Observable.combineLatest(
      this._auth.isAdministrator(),
      this._auth.isModerator())
      .map(x => x[0] && x[1])
      .do(x => {
        if (!x) {
          this._router.navigate(['/forum']);
          this._translate.get('notifications.errors.isAdminOrModeratorGuard')
            .first()
            .subscribe(message => this._toast.error(message));
        }
      });
  }
}
