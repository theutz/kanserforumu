import { AuthService } from '../../services/auth.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { OnDestroy, Component, OnInit } from '@angular/core';
import { ForumService } from 'app/services/forum.service';
import { Forum, Forums } from 'app/services/forum';
import { FirebaseListObservable } from 'angularfire2';
import { NgxLoremIpsumService } from 'ngx-lorem-ipsum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.scss']
})
export class ForumListComponent implements OnInit, OnDestroy {
  forums: FirebaseListObservable<Forums>;

  private _forumSub: Subscription;

  constructor(
    private _forumsService: ForumService,
    private _lorem: NgxLoremIpsumService,
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._loadForums();
  }

  ngOnDestroy() {
    this._forumSub.unsubscribe();
  }

  isLoggedIn(): Observable<boolean> {
    return this._auth.isLoggedIn();
  }

  addForum() {

  }

  private _loadForums() {
    this.forums = this._forumsService.getAll();
  }

}
