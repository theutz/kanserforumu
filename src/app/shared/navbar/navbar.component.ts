import { TranslationConfigService } from '../../services/translation-config.service';
import { Subscription } from 'rxjs/Rx';
import { BrandingService } from '../../services/branding.service';
import { Component, OnInit, OnDestroy, HostBinding, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  title: string;
  links: Array<{ url: string[] | string, title: string }> = [];
  isCollapsed = true;

  private _titleSubscription: Subscription;

  constructor(
    private _brand: BrandingService,
    private _transConfig: TranslationConfigService,
    private _trans: TranslateService
  ) { }

  ngOnInit() {
    this._setTitle();
    this._setLinks();
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
    this._titleSubscription.unsubscribe();
  }

  private _setTitle() {
    this._titleSubscription = this._brand.siteName$
      .subscribe(x => this.title = x);
  }

  private _setLinks() {
    this._trans.get('NAVBAR.LINKS').subscribe(x => {
      this.links.push({ title: x['HOME'], url: [''] });
      this.links.push({ title: x['FORUM'], url: ['/forum'] });
    })
  }

}
