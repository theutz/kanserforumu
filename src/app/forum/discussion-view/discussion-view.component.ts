import { Subject } from 'rxjs/Rx';
import { Discussion } from '../../services/discussion';
import { DiscussionsService } from '../../services/discussions.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discussion-view',
  templateUrl: './discussion-view.component.html',
  styleUrls: ['./discussion-view.component.scss']
})
export class DiscussionViewComponent implements OnInit, OnDestroy {
  discussion: Discussion;

  private _unsubscriber = new Subject<void>();
  private _destroy$ = this._unsubscriber.asObservable();

  constructor(
    private _discussionService: DiscussionsService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.paramMap
      .takeUntil(this._destroy$)
      .map(map => map.get('discussionId'))
      .switchMap(key => this._discussionService.get(key))
      .do(d => this.discussion = d)
      .subscribe(console.log);
  }

  ngOnDestroy() {
    this._unsubscriber.next(null);
    this._unsubscriber.complete();
  }
}
