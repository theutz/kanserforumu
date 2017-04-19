import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _toast: ToastrService,
    private _translate: TranslateService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  loginVia(provider: string) {
    const baseKey = 'login.notifications';
    this._auth.loginViaProvider(provider).subscribe(() => {
      const bodyKey = `${baseKey}.success.body`,
        titleKey = `${baseKey}.success.titlE`;
      this._translate
        .get([bodyKey, titleKey], { provider: provider })
        .subscribe(translation => {
          this._router.navigate(['/forum']).then(() => {
            this._toast.success(translation[bodyKey], translation[titleKey]);
          });
        });
    },
      err => {
        if (err.code === 'auth/account-exists-with-different-credential') {
          const bodyKey = `${baseKey}.error.wrong_provider.titlE`,
            titleKey = `${baseKey}.error.wrong_provider.body`;
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
