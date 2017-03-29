import { TranslationConfigService } from '../../services/translation-config.service';
import { Subscription } from 'rxjs/Rx';
import { BrandingService } from '../../services/branding.service';
import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  title: string;
  links: Array<{ url: string[] | string, title: string }> = [];

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

  ngOnDestroy() {
    this._titleSubscription.unsubscribe();
  }

  private _setTitle() {
    this._titleSubscription = this._brand.siteName$
      .subscribe(x => this.title = x);
  }

  private _setLinks() {
    this.links.push({ title: 'Home', url: ['/home'] });
    this.links.push({ title: 'Forum', url: ['/forum'] });
  }

}
