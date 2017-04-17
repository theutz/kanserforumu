import { ToastrService } from 'ngx-toastr/toastr-service';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../services/comment';
import { AuthService } from '../../services/auth.service';
import { Discussion } from '../../services/discussion';
import { DiscussionsService } from '../../services/discussions.service';
import { UserInfo } from '../../services/user-info';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-discussion-view',
  templateUrl: './discussion-view.component.html',
  styleUrls: ['./discussion-view.component.scss']
})
export class DiscussionViewComponent implements OnInit, OnDestroy {
  discussion: Discussion;
  comments: Comment[];
  user: UserInfo;
  newComment: Comment;
  showEditor = true;

  readonly blankComment: Comment = {
    key: '',
    body: '',
    createdDate: new Date().toISOString(),
    discussionKey: '',
    userKey: ''
  };

  private _unsubscriber = new Subject<void>();
  private _destroy$ = this._unsubscriber.asObservable();

  constructor(
    private _discussionService: DiscussionsService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _commentsService: CommentsService,
    private _toast: ToastrService
  ) {
    this.newComment = this.blankComment;
  }

  ngOnInit() {
    this._route.paramMap
      .takeUntil(this._destroy$)
      .map(map => map.get('discussionId'))
      .do(key => this.newComment.discussionKey = key)
      .switchMap(key => this._discussionService.get(key))
      .do(d => this.discussion = d)
      .switchMap(d => this._commentsService.getAllByDiscussionKey(d.key))
      .do(c => this.comments = c)
      .subscribe();

    this._auth.currentUser()
      .takeUntil(this._destroy$)
      .do(u => this.newComment.userKey = u.uid)
      .subscribe(u => this.user = u);
  }

  addComment() {
    this._commentsService.add(this.newComment)
      .first()
      .subscribe(x => {
        this._toast.success('Comment added');
        this.showEditor = false;
      });
  }

  keyupHandler(content) {
    this.newComment.body = content;
  }

  ngOnDestroy() {
    this._unsubscriber.next(null);
    this._unsubscriber.complete();
  }
}
