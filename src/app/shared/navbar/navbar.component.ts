import { Subscription } from 'rxjs/Rx';
import { OnDestroy } from '@angular/core/core';
import { BrandingService } from '../../services/branding.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private _titleSubscription: Subscription;

  title: string;

  constructor(
    private _brand: BrandingService
  ) { }

  ngOnInit() {
    this._titleSubscription = this._brand.siteName$.subscribe(x => this.title = x);
  }

  ngOnDestroy() {
    this._titleSubscription.unsubscribe();
  }

}
