import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr/toastr-service';
import { AuthService } from '../../services/auth.service';
import { Observable, ReplaySubject, Subject, Subscription } from 'rxjs/Rx';
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
  forums: Forum[] = [];
  forumsSubscription: Subscription;

  constructor(
    private _forumsService: ForumService,
    private _lorem: NgxLoremIpsumService,
    private _auth: AuthService,
    private _toast: ToastrService,
    private _router: Router,
    private _trs: TranslateService
  ) { }

  ngOnInit() {
    this._forumsService.getAll()
      .subscribe(forums => this.forums = forums);
  }

  ngOnDestroy() {
  }

  isLoggedIn(): Observable<boolean> {
    return this._auth.isLoggedIn();
  }

  addForum() {
    this._forumsService.add({
      title: 'New Forum',
      key: '',
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      description: '',
      discussionKeys: [{}]
    })
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
        this._toast
          .success(`${forum.title} was removed.`, 'Success');
      });
  }

  discussionCount(forum: Forum): number {
    return !!forum.discussionKeys
      ? Object.keys(forum.discussionKeys).length
      : 0;
  }
}
