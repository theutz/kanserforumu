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

  private _subscriptions: Subscription[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _forumService: ForumService,
    private _discussionService: DiscussionsService
  ) { }

  ngOnInit() {
    this._loadForum();
  }

  ngOnDestroy() {
    this._subscriptions.map(x => x.unsubscribe());
  }

  addDiscussion() {
    // const discussion: Discussion = {
    //   createdDate: new Date().toISOString(),
    //   title: `Discussion ${Math.floor(Math.random() * 1000)}`,
    //   forumKey: this.forum.$ref.key
    // };
    // this._discussionService
    //   .create(discussion)
    //   .subscribe(key => {
    //     this._forumService
    //       .addDiscussionKey(this.forum.$ref.key, key);
    //   });
  }

  private _loadForum() {
    this._getForumKeyFromRoute()
      .subscribe(key => {
        const forumSub = this._forumService.get(key)
          .do(() => this._subscriptions.push(forumSub))
          .subscribe(f => this.forum = f);
      })
  }

  private _getForumKeyFromRoute(): Observable<string> {
    const subject = new ReplaySubject<string>();
    this._route.paramMap
      .subscribe(map => subject.next(map.get('id')));
    return subject.asObservable();
  }

}
