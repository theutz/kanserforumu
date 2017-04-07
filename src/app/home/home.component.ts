import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Slides, Slide } from './slides';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides: Slides;
  i18n: any;

  constructor(
    private _translate: TranslateService
  ) { }

  ngOnInit() {
    this._translate.get('home')
      .subscribe(x => {
        this.i18n = x;
        this.slides = x.slides;
      });
  }

}
