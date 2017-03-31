import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Rx';
import { OnDestroy, OnInit } from '@angular/core/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string;

  private _titleSub: Subscription;

  constructor(
    private _translate: TranslateService
  ) {
    this._translate.addLangs(['en', 'tr']);
    this._translate.setDefaultLang('tr');

    const browserLang = this._translate.getBrowserLang();
    this._translate.use(browserLang.match(/en|tr/) ? browserLang : 'tr');
  }

  ngOnInit() {
    this._titleSub = this._translate
      .get('BRAND.SITE_NAME')
      .subscribe(x => this.title = x);
  }

  ngOnDestroy() {
    this._titleSub.unsubscribe();
  }
}
