import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'button[add-btn], a[add-btn]',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {
  @HostBinding('class.btn') btn = true;
  @HostBinding('class.btn-primary') btnPrimary = true;
  @HostBinding('class.d-flex') dFlex = true;
  @HostBinding('class.align-items-center') align = true;

  constructor() { }

  ngOnInit() {
  }

}
