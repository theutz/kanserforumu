import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Discussion } from '../../services/discussion';
import { DiscussionsService } from '../../services/discussions.service';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-discussions-list',
  templateUrl: './discussions-list.component.html',
  styleUrls: ['./discussions-list.component.scss']
})
export class DiscussionsListComponent implements OnInit {
  discussions: FirebaseListObservable<Discussion[]>;

  constructor(
    private _dis: DiscussionsService
  ) {
    this.discussions = this._dis.getAll();
  }

  ngOnInit() {
    this.discussions = this._dis.getAll();
  }

}
