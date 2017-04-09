import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr/toastr-service';
import { AuthService } from '../../services/auth.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { OnDestroy, Component, OnInit } from '@angular/core';
import { ForumService } from 'app/services/forum.service';
import { Forum } from 'app/services/forum';
import { NgxLoremIpsumService } from 'ngx-lorem-ipsum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.scss']
})
export class ForumListComponent implements OnInit, OnDestroy {
  forums: Forum[];
  i18n: any;

  private _forums$sub: Subscription;
  private _i18n$sub: Subscription;

  constructor(
    private _forumsService: ForumService,
    private _lorem: NgxLoremIpsumService,
    private _auth: AuthService,
    private _toast: ToastrService,
    private _router: Router,
    private _trs: TranslateService
  ) { }

  ngOnInit() {
    this._forums$sub = this._forumsService.getAll()
      .subscribe(forums => {
        this.forums = forums;
        this._i18n$sub = this._trs.get('forum.list')
          .subscribe(i18n => this.i18n = i18n);
      });
  }

  ngOnDestroy() {
    this._i18n$sub.unsubscribe();
    this._forums$sub.unsubscribe();
  }

  isLoggedIn(): Observable<boolean> {
    return this._auth.isLoggedIn();
  }

  addForum() {
    this._forumsService.add()
      .first()
      .subscribe(forum => {
        this._router.navigate(['forum', forum.key, 'edit']);
      });
  }

  removeForum(forum: Forum) {
    this._forumsService
      .remove(forum.key)
      .first()
      .subscribe(() => {
        this._toast.success(`${forum.title} was removed.`, 'Success');
      });
  }

  private _dummyForumFactory(): Forum {
    return {
      key: null,
      title: `Forum #${Math.floor(Math.random() * 1000)}`,
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      description: this._lorem.get(2),
      discussionKeys: null
    };
  }

}
