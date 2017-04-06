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
  private _subscriptions: Subscription[] = [];

  constructor(
    private _forumsService: ForumService,
    private _lorem: NgxLoremIpsumService,
    private _auth: AuthService,
    private _toast: ToastrService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._loadForum();
  }

  private _loadForum() {
    const sub = this._forumsService.getAll()
      .subscribe(forums => this.forums = forums);

    this._subscriptions.push(sub);
  }

  ngOnDestroy() {
    this._subscriptions.map(s => s.unsubscribe());
  }

  isLoggedIn(): Observable<boolean> {
    return this._auth.isLoggedIn();
  }

  addForum() {
    const forum = this._dummyForumFactory();
    this._forumsService
      .add(forum)
      .first()
      .subscribe(() => this._toast.success(`${forum.title} was created!`, `Success`));
  }

  removeForum(forum: Forum) {
    this._forumsService
      .remove(forum.key)
      .first()
      .subscribe(() => {
        this._toast.success(`${forum.title} was removed.`, 'Success');
      })
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
