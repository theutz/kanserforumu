import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslationConfigService {

  constructor(
    private translate: TranslateService
  ) { }

  configure() {
    this.translate.addLangs(['en', 'tr']);
    this.translate.setDefaultLang('tr');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|tr/) ? browserLang : 'tr');
  }

}
