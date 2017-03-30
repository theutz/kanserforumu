import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Discussion } from '../discussion';

@Component({
  selector: 'app-discussions-list',
  templateUrl: './discussions-list.component.html',
  styleUrls: ['./discussions-list.component.scss']
})
export class DiscussionsListComponent implements OnInit {
  discussions: Discussion[] = [];

  constructor() { }

  ngOnInit() {
    this._loadDummyDiscussions();
  }

  private _loadDummyDiscussions() {
    this.discussions = [
      {
        id: '1',
        title: 'Occaecat quis pariatur eu anim.',
        body: 'Ullamco consequat sint labore quis esse id deserunt reprehenderit sit aliqua pariatur commodo. Ea sint in ipsum aute eiusmod enim nostrud ipsum. Nostrud occaecat nisi et non. Irure quis pariatur duis exercitation officia excepteur pariatur do. Ullamco id laboris dolor velit enim fugiat consequat ullamco ad exercitation ea duis. Excepteur velit sit non non est nulla aute elit exercitation.',
        summary: 'Ullamco consequat sint labore quis esse id deserunt reprehenderit sit aliqua pariatur commodo. Ea sint in ipsum aute e',
        createdDate: moment().toDate(),
        modifiedDate: moment().toDate()
      },
      {
        id: '2',
        title: 'Ex pariatur consequat culpa aute occaecat magna.',
        createdDate: moment()
          .subtract(2, 'days').toDate(),
        modifiedDate: moment()
          .subtract(2, 'days').toDate()
      }
    ];
  }
}
