import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  @Input() icon = '';
  @Input() title = '';
  @Input() footer = '';

  constructor() { }

  ngOnInit() {
  }

}
