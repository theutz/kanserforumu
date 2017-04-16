import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'button[remove-btn], a[remove-button]',
  templateUrl: './remove-button.component.html',
  styleUrls: ['./remove-button.component.scss']
})
export class RemoveButtonComponent implements OnInit {
  @HostBinding('class.btn') btn = true;
  @HostBinding('class.btn-danger') btnColor = true;

  constructor() { }

  ngOnInit() {
  }

}
