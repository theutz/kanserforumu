import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'button[login-btn], a[login-btn]',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {
  @HostBinding('class.btn') btn = true;
  @HostBinding('class.btn-info') btnClr = true;

  constructor() { }

  ngOnInit() {
  }

}
