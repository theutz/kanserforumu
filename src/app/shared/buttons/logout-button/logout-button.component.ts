import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'a[logout-btn], button[logout-btn]',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {
  @HostBinding('class.btn') btn = true;
  @HostBinding('class.btn-info') btnColor = true;

  constructor() { }

  ngOnInit() {
  }

}
