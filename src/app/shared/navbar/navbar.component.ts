import { UserInfo } from '../../services/user-info';
import { AuthService } from '../../services/auth.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit, ViewContainerRef, OnDestroy, HostBinding, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  title: string;
  links: Array<{ url: string | string, title: string, icon: string }> = [];
  isCollapsed = true;
  currentUser: UserInfo;
  i18n: any;

  private _currentUser$sub: Subscription;
  private _i18n$sub: Subscription;

  constructor(
    private _trans: TranslateService,
    private _auth: AuthService,
    private _toast: ToastrService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._currentUser$sub = this._auth.currentUser().subscribe(user => {
      this.currentUser = user;

      this._i18n$sub = this._trans
        .get('navbar', {
          welcome: {
            displayName: user.displayName
          }
        })
        .subscribe(i18n => {
          this.i18n = i18n;
          this.links.push({ title: i18n.links.home, url: '/home', icon: 'home' });
          this.links.push({ title: i18n.links.forum, url: '/forum', icon: 'users' });
        });
    });
  }

  toggleNavbar(event?: Event): void {
    if (!!event) {
      event.preventDefault();
    }
    this.isCollapsed = !this.isCollapsed;
  }

  @HostListener('window:click', ['$event'])
  onWindowClick(event) {
    if (event.target.id !== 'navbar-toggler' && !this.isCollapsed) {
      this.toggleNavbar();
    }
  }

  ngOnDestroy() {
    this._currentUser$sub.unsubscribe();
    this._i18n$sub.unsubscribe();
  }

  isLoggedIn(): Observable<boolean> {
    return this._auth.isLoggedIn();
  }

  logout() {
    this._auth.logout()
      .subscribe(state => {
        if (state === 'success') {
          const base = 'NAVBAR.NOTIFICATIONS.LOGOUT',
            title = `${base}.TITLE`,
            body = `${base}.BODY`;
          this._trans
            .get([title, body])
            .subscribe(trans => {
              this._router.navigate(['/']).then(() => this._toast.success(trans[body], trans[title]))
                ;
            });
        }
      });
  }

  login() {
    this._router.navigate(['/login']);
  }

}
