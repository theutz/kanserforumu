import { Forum } from '../../services/forum';
import { ForumService } from '../../services/forum.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr/toastr-service';
import { Observable, Subscription } from 'rxjs/Rx';

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
  private _i18$sub: Subscription;
  private _formSubmit$sub: Subscription;

  constructor(
    private _forumService: ForumService,
    private _route: ActivatedRoute,
    private _trs: TranslateService,
    private _toast: ToastrService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._key$sub = this._route.paramMap
      .map(map => map.get('id'))
      .subscribe(key => {
        this._forum$sub = this._forumService.get(key)
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

  onSubmit(forum: Forum) {
    this._formSubmit$sub = this._forumService
      .update(forum)
      .first()
      .subscribe(x => {
        this._router.navigate(['/forum', forum.key]).then(() =>
          this._toast.success(`${forum.title} updated!`, 'Success!')
        );
      });
  }

  private _getForumKeyFromRoute(): Observable<string> {
    return this._route.paramMap.map(map => map.get('id'));
  }
}
