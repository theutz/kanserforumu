import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'button[edit-btn], a[edit-btn]',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss']
})
export class EditButtonComponent implements OnInit {
  @HostBinding('class.btn') btn = true;
  @HostBinding('class.btn-warning') btnColor = true;

  constructor() { }

  ngOnInit() {
  }

}
