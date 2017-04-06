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
  forumKey: string;
  forum$: Observable<Forum>;
  discussions$: Observable<Discussion[]>;

  private _keySub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _forumService: ForumService,
    private _discussionService: DiscussionsService,
    private _router: Router,
    private _lorem: NgxLoremIpsumService
  ) { }

  ngOnInit() {
    this._keySub = this._getForumKeyFromRoute()
      .subscribe(key => {
        this.forumKey = key;
        this.forum$ = this._forumService.get(key);
        this.discussions$ = this._discussionService.getByForumKey(key);
      });
  }

  ngOnDestroy() {
    this._keySub.unsubscribe();
  }

  addDiscussion() {
    this._discussionService
      .add(this._discussionService
        .makeDummyDiscussion(this.forumKey));
  }

  removeForum() {
    this._forumService
      .remove(this.forumKey)
      .subscribe(() => this._router.navigate(['/forum']));
  }

  private _getForumKeyFromRoute(): Observable<string> {
    return this._route.paramMap
      .map(map => map.get('id'));
  }

}
