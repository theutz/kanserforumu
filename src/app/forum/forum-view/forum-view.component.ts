import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr/toastr-service';
import { NgxLoremIpsumService } from 'ngx-lorem-ipsum/lib';
import { OnDestroy } from '@angular/core/core';
import { Discussion } from '../../services/discussion';
import { DiscussionsService } from '../../services/discussions.service';
import { ForumService } from '../../services/forum.service';
import { Observable, ReplaySubject, Subject, Subscription } from 'rxjs/Rx';
import { Forum } from '../../services/forum';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forum-view',
  templateUrl: './forum-view.component.html',
  styleUrls: ['./forum-view.component.scss']
})
export class ForumViewComponent implements OnInit, OnDestroy {
  forum: Forum;
  discussions: Discussion[];

  private _unsubscriber = new Subject<void>();
  private _unsubscribe$ = this._unsubscriber.asObservable();

  constructor(
    private _route: ActivatedRoute,
    private _forumService: ForumService,
    private _discussionService: DiscussionsService,
    private _router: Router,
    private _toast: ToastrService,
  ) { }

  ngOnInit() {
    this._getForumKeyFromRoute()
      .takeUntil(this._unsubscribe$)
      .switchMap(key => this._forumService.get(key))
      .do(forum => this.forum = forum)
      .switchMap(forum => this._discussionService.getByForumKey(forum.key))
      .do(discussions => this.discussions = discussions)
      .subscribe();
  }

  ngOnDestroy() {
    this._unsubscriber.next(null);
    this._unsubscriber.complete();
  }

  addDiscussion() {
    this._discussionService
      .add(this._newDiscussion())
      .first()
      .subscribe(discussion => {
        this._router
          .navigate(this.discussionRoute(discussion.key)
            .concat('edit'));
      });
  }

  editForum() {
    this._router.navigate(this.editForumRoute());
  }

  editForumRoute(): string[] {
    return this.forumRoute().concat('edit');
  }

  forumRoute(): string[] {
    return ['/forum', this.forum.key];
  }

  removeForum() {
    this._forumService.remove(this.forum.key)
      .first()
      .subscribe(() => this._router.navigate(['/forum']));
  }

  discussionRoute(discussionKey: string): any[] {
    return this.forumRoute().concat('discussion', discussionKey);
  }

  private _getForumKeyFromRoute(): Observable<string> {
    return this._route.paramMap
      .map(map => map.get('id'));
  }

  private _newDiscussion(): Discussion {
    return {
      key: '', forumKey: this.forum.key,
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      description: '', title: 'New Discussion'
    };
  };

}
