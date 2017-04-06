import { NgxLoremIpsumService } from 'ngx-lorem-ipsum/lib';
import { OnDestroy } from '@angular/core/core';
import { Discussion, Discussions } from '../../services/discussion';
import { DiscussionsService } from '../../services/discussions.service';
import { ForumService } from '../../services/forum.service';
import { Observable, ReplaySubject, Subscription } from 'rxjs/Rx';
import { Forum } from '../../services/forum';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum-view',
  templateUrl: './forum-view.component.html',
  styleUrls: ['./forum-view.component.scss']
})
export class ForumViewComponent implements OnInit, OnDestroy {
  forumKey: string;
  forum$: Observable<Forum>;
  discussions$: Observable<Discussions>;

  private _subscriptions: Subscription[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _forumService: ForumService,
    private _discussionService: DiscussionsService,
    private _lorem: NgxLoremIpsumService
  ) { }

  ngOnInit() {
    this._getForumKeyFromRoute()
      .do(key => this.forum$ = this._forumService.get(key))
      .do(key => this.discussions$ = this._discussionService.getByForumKey(key))
      .subscribe(key => this.forumKey = key);
  }

  ngOnDestroy() {
    this._subscriptions.map(x => x.unsubscribe());
  }

  addDiscussion() {
    this._discussionService.add(this._discussionService.makeDummyDiscussion(this.forumKey));
  }

  private _loadForum(): Observable<Forum> {
    return this._getForumKeyFromRoute()
      .switchMap(key => this._forumService.get(key));
  }

  private _getForumKeyFromRoute(): Observable<string> {
    return this._route.paramMap
      .map(map => map.get('id'));
  }

}
