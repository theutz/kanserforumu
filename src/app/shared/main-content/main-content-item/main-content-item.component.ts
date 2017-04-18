import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-content-item',
  templateUrl: './main-content-item.component.html',
  styleUrls: ['./main-content-item.component.scss']
})
export class MainContentItemComponent implements OnInit {
  @Input() title: string;
  @Input() badge: string;
  @Input('badge-icon') badgeIcon: string;
  @Input() route: string;

  constructor() { }

  ngOnInit() {
  }

}
