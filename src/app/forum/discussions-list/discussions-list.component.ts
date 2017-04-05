import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Discussion, Discussions } from '../../services/discussion';
import { DiscussionsService } from '../../services/discussions.service';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-discussions-list',
  templateUrl: './discussions-list.component.html',
  styleUrls: ['./discussions-list.component.scss']
})
export class DiscussionsListComponent implements OnInit {
  discussions: Observable<Discussions>;

  constructor(
    private _dis: DiscussionsService
  ) { }

  ngOnInit() {
    this.discussions = this._dis.getAll();
  }

}
