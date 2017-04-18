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

  private _unsubscriber = new Subject<void>();
  private _destroy$ = this._unsubscriber.asObservable();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dService: DiscussionsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this._getDiscussionKeyFromRoute()
      .takeUntil(this._destroy$)
      .switchMap(key => this._dService.get(key))
      .subscribe(d => this.discussion = d);
  }

  ngOnDestroy() {
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }

  onSubmit(discussion: Discussion) {
    this._dService.update(discussion)
      .first()
      .map(() =>
        Observable.fromPromise(
          this._router.navigate(['/discussion', discussion.key])))
      .subscribe(() => this._toast.success(`${discussion.title} updated`, 'Success'));
  }

  private _getDiscussionKeyFromRoute(): Observable<string> {
    return this._route.paramMap
      .map(p => p.get('id'));
  }
}
