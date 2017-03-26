import { Subscription } from 'rxjs/Rx';
import { OnDestroy, OnInit } from '@angular/core/core';
import { Component } from '@angular/core';
import { BrandingService } from 'app/services/branding.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string;

  private _titleSub: Subscription;

  constructor(
    private _brand: BrandingService
  ) { }

  ngOnInit() {
    this._titleSub = this._brand.siteName$
      .subscribe(x => this.title = x);
  }

  ngOnDestroy() {
    this._titleSub.unsubscribe();
  }
}
