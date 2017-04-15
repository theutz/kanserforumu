import { ToastrService } from 'ngx-toastr/toastr-service';
import { TranslateService } from '@ngx-translate/core';
import { DiscussionsService } from '../../services/discussions.service';
import { Discussion } from '../../services/discussion';
import { Observable, Subject, Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-discussion-edit',
  templateUrl: './discussion-edit.component.html',
  styleUrls: ['./discussion-edit.component.scss']
})
export class DiscussionEditComponent implements OnInit, OnDestroy {
  discussion: Discussion;
  i18n: any;

  private _destroySub: Subject<void> = new Subject<void>();
  private _destroy$: Observable<void>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dService: DiscussionsService,
    private _trans: TranslateService,
    private _toast: ToastrService
  ) {
    this._destroy$ = this._destroySub.asObservable();
  }

  ngOnInit() {
    this._getDiscussionKeyFromRoute()
      .switchMap(key => this._dService.get(key))
      .takeUntil(this._destroy$)
      .subscribe(d => this.discussion = d);
    this._trans.get('discussion.edit')
      .takeUntil(this._destroy$)
      .subscribe(t => this.i18n = t);
  }

  ngOnDestroy() {
    this._destroySub.next();
  }

  onSubmit(discussion: Discussion) {
    this._dService.update(discussion)
      .first()
      .map(() =>
        Observable.fromPromise(
          this._router.navigate(['forum', discussion.forumKey,
            'discussion', discussion.key])))
      .subscribe(() => this._toast.success(`${discussion.title} updated`, 'Success'));
  }

  private _getDiscussionKeyFromRoute(): Observable<string> {
    return this._route.paramMap
      .map(p => p.get('discussionId'));
  }
}
