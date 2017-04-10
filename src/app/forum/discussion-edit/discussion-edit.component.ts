import { DiscussionsService } from '../../services/discussions.service';
import { Discussion } from '../../services/discussion';
import { Observable, Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-discussion-edit',
  templateUrl: './discussion-edit.component.html',
  styleUrls: ['./discussion-edit.component.scss']
})
export class DiscussionEditComponent implements OnInit, OnDestroy {
  discussion: Discussion;

  private _discSub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dService: DiscussionsService
  ) { }

  ngOnInit() {
    this._discSub = this._getDiscussionKeyFromRoute()
      .switchMap(key => this._dService.get(key))
      .subscribe(d => this.discussion = d);
  }

  ngOnDestroy() {
    this._discSub.unsubscribe();
  }

  private _getDiscussionKeyFromRoute(): Observable<string> {
    return this._route.paramMap
      .map(p => p.get('discussionId'));
  }
}
