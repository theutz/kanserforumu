import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'button[save-btn], a[save-btn]',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent implements OnInit {
  @HostBinding('class.btn') btn = true;
  @HostBinding('class.btn-success') btnColor = true;

  constructor() { }

  ngOnInit() {
  }

}
