import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'button[back-btn], a[back-btn]',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
  @HostBinding('class.btn') btn = true;
  @HostBinding('class.btn-info') btnColor = true;

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    this._location.back();
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {
  }

}
