import { TranslationConfigService } from './translation-config.service';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class BrandingService {
  siteName$: Observable<string>;

  private _siteNameSrc: ReplaySubject<string> = new ReplaySubject<string>();

  constructor(
    private _transConf: TranslationConfigService,
    private _trans: TranslateService
  ) {
    this._transConf.configure();

    this.siteName$ = this._siteNameSrc.asObservable();

    this._trans.get('BRAND.SITE_NAME')
      .subscribe(x => this._siteNameSrc.next(x));
  }

}
