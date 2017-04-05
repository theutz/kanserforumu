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
  forum: Forum;
  discussions = [];

  private _subscriptions: Subscription[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _forumService: ForumService,
    private _discussionService: DiscussionsService,
    private _lorem: NgxLoremIpsumService
  ) { }

  ngOnInit() {
    this._loadForum();
  }

  ngOnDestroy() {
    this._subscriptions.map(x => x.unsubscribe());
  }

  addDiscussion() {
    this._discussionService.add(this._makeDummyDiscussion());
  }

  private _loadForum(): Observable<void> {
    const subject = new ReplaySubject<void>();

    this._getForumKeyFromRoute()
      .subscribe(key => {

        const forumSub = this._forumService.get(key)
          .do(() => this._subscriptions.push(forumSub))
          .subscribe(forum => {
            this.forum = forum;
          });
      })

    return subject.asObservable();
  }

  private _getForumKeyFromRoute(): Observable<string> {
    const subject = new ReplaySubject<string>();
    this._route.paramMap
      .subscribe(map => subject.next(map.get('id')));
    return subject.asObservable();
  }

  private _makeDummyDiscussion(): Discussion {
    return {
      key: null,
      title: `Discussion #${Math.floor(Math.random() * 1000)}`,
      description: this._lorem.get(2),
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      forumKey: this.forum.key
    };
  }

}
