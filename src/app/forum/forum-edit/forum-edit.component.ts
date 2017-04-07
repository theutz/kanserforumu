import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../../services/forum.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Forum } from '../../services/forum';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-forum-edit',
  templateUrl: './forum-edit.component.html',
  styleUrls: ['./forum-edit.component.scss']
})
export class ForumEditComponent implements OnInit, OnDestroy {
  private _key$sub: Subscription;

  forum: Forum;
  private _forum$: Observable<Forum>;
  private _forum$sub: Subscription;

  constructor(
    private _fs: ForumService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._key$sub = this._createForum$();
    this._forum$sub = this._subscribeToForum();
  }

  ngOnDestroy() {
    this._key$sub.unsubscribe();
    this._forum$sub.unsubscribe();
  }

  private _subscribeToForum(): Subscription {
    return this._forum$.subscribe(forum => this.forum = forum);
  }

  private _createForum$(): Subscription {
    return this._getForumKeyFromRoute().subscribe(key => this._forum$ = this._fs.get(key));
  }

  private _getForumKeyFromRoute(): Observable<string> {
    return this._route.paramMap.map(map => map.get('id'));
  }
}
