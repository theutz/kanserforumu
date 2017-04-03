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

  constructor(
    private _translate: TranslateService
  ) { }

  ngOnInit() {
    this._setSlides();
  }

  private _setSlides() {
    this._translate
      .get('HOME.SLIDES')
      .subscribe(slides => {
        this.slides = slides;
      });
  }

}
