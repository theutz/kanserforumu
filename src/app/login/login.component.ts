import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from '../services/user-info';
import { Subject, Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  private _unsbscriber = new Subject<void>();
  private _destroy$ = this._unsbscriber.asObservable();

  constructor(
    private _auth: AuthService,
    private _toast: ToastrService,
    private _translate: TranslateService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this._auth.login(this.email, this.password)
      .subscribe(() => this._onLoginSuccess(), err => this._onLoginError(err));
  }

  private _onLoginSuccess() {
    this._translate.get('login.notifications.success')
      .do(message => this._toast.success(message))
      .do(x => this._router.navigate(['/forum']))
      .first()
      .subscribe();
  }

  private _onLoginError(err: any) {
    this._translate.get('login.notifications.error')
      .map(message => this._toast.error(message))
      .do(x => console.error(err))
      .first()
      .subscribe();
  }

  loginVia(provider: string) {
    this._auth.loginViaProvider(provider)
      .first()
      .subscribe(() => this._onLoginSuccess(), err => this._onLoginError(err));
  }
}
