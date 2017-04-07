import { TranslateService } from '@ngx-translate/core';
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
  forum: Forum;
  i18n: any;

  private _forum$sub: Subscription;
  private _key$sub: Subscription;
  private _i18$sub: Subscription

  constructor(
    private _fs: ForumService,
    private _route: ActivatedRoute,
    private _trs: TranslateService
  ) { }

  ngOnInit(): void {
    this._key$sub = this._route.paramMap
      .map(map => map.get('id'))
      .subscribe(key => {
        this._forum$sub = this._fs.get(key)
          .subscribe(forum => this.forum = forum);
      });

    this._i18$sub = this._trs.get('forum.edit')
      .subscribe(i18n => this.i18n = i18n);
  }

  ngOnDestroy(): void {
    this._key$sub.unsubscribe();
    this._forum$sub.unsubscribe();
    this._i18$sub.unsubscribe();
  }

  private _getForumKeyFromRoute(): Observable<string> {
    return this._route.paramMap.map(map => map.get('id'));
  }
}
