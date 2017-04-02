import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _toast: ToastsManager,
    vcr: ViewContainerRef,
    private _translate: TranslateService,
    private _router: Router
  ) {
    this._toast.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  loginVia(provider: string) {
    const transBase = 'LOGIN.NOTIFICATIONS';
    this._auth.loginViaProvider(provider).subscribe(() => {
      const bodyKey = `${transBase}.SUCCESS.BODY`;
      const titleKey = `${transBase}.SUCCESS.TITLE`;
      this._translate
        .get([bodyKey, titleKey], { provider: provider })
        .subscribe(translation => {
          this._toast.success(translation[bodyKey], translation[titleKey]);
          this._router.navigate(['/forum']);
        });
    },
      err => {
        if (err.code === 'auth/account-exists-with-different-credential') {
          const bodyKey = `${transBase}.ERROR.WRONG_PROVIDER.TITLE`;
          const titleKey = `${transBase}.ERROR.WRONG_PROVIDER.BODY`;
          this._translate
            .get([bodyKey, titleKey], { attemptedProvider: err.credential.provider })
            .subscribe(trans => {
              this._toast.error(trans[bodyKey], trans[titleKey]);
            })
        }
      }
    );
  }

}
