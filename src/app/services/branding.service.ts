import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class BrandingService {
  private _siteNameSrc: BehaviorSubject<string> = new BehaviorSubject<string>('Kanser Forumu');
  siteName$: Observable<string>;

  constructor() {
    this.siteName$ = this._siteNameSrc.asObservable();
  }

}
