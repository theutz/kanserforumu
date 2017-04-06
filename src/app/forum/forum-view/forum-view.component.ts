import { ToastrService } from 'ngx-toastr/toastr-service';
import { NgxLoremIpsumService } from 'ngx-lorem-ipsum/lib';
import { OnDestroy } from '@angular/core/core';
import { Discussion } from '../../services/discussion';
import { DiscussionsService } from '../../services/discussions.service';
import { ForumService } from '../../services/forum.service';
import { Observable, ReplaySubject, Subscription } from 'rxjs/Rx';
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

  private _forum$: Observable<Forum>;
  private _forum$sub: Subscription;
  private _discussions$: Observable<Discussion[]>;
  private _discussions$sub: Subscription;
  private _key$sub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _forumService: ForumService,
    private _discussionService: DiscussionsService,
    private _router: Router,
    private _toast: ToastrService,
    private _lorem: NgxLoremIpsumService
  ) { }

  ngOnInit() {
    this._key$sub = this._getForumKeyFromRoute()
      .subscribe(key => {
        this._forum$ = this._forumService.get(key);
        this._discussions$ = this._discussionService.getByForumKey(key);
      });

    this._forum$sub = this._forum$
      .subscribe(forum => this.forum = forum);

    this._discussions$sub = this._discussions$
      .subscribe(discussions =>
        this.discussions = discussions);
  }

  ngOnDestroy() {
    this._key$sub.unsubscribe();
    this._forum$sub.unsubscribe();
    this._discussions$sub.unsubscribe();
  }

  addDiscussion() {
    this._discussionService
      .add(this._discussionService
        .makeDummyDiscussion(this.forum.key));
  }

  removeDiscussion(discussion: Discussion) {
    this._discussionService
      .remove(discussion.key)
      .subscribe(() => {
        this._toast.success(`Removed ${discussion.title} successfully.`, 'Success!')
      })
  }

  removeForum() {
    this._forumService
      .remove(this.forum.key)
      .subscribe(() => {
        this._router.navigate(['/forum'])
          .then(() => { });
      });
  }

  private _getForumKeyFromRoute(): Observable<string> {
    return this._route.paramMap
      .map(map => map.get('id'));
  }

}
