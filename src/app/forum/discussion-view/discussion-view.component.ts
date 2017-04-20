import { AuthService } from '../../services/auth.service';
import { Comment } from '../../services/comment';
import { CommentsService } from '../../services/comments.service';
import { Discussion } from '../../services/discussion';
import { DiscussionsService } from '../../services/discussions.service';
import { UserInfo } from '../../services/user-info';
import { TinyEditorComponent } from '../../shared/tiny-editor/tiny-editor.component';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr/toastr-service';
import { Observable, Subject } from 'rxjs/Rx';

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
    hideEditor = true;
    canEdit = false;
    isLoggedIn = false;

    @ViewChild(TinyEditorComponent)
    tiny: TinyEditorComponent;

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
        private _toast: ToastrService,
    ) {
        this.newComment = this.blankComment;
    }

    ngOnInit() {
        this._route.paramMap
            .takeUntil(this._destroy$)
            .map(map => map.get('id'))
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

        this._auth.isLoggedIn()
            .takeUntil(this._destroy$)
            .subscribe(x => this.isLoggedIn = x);

        Observable.forkJoin([
            this._auth.isAdministrator().first(),
            this._auth.isModerator().first()])
            .subscribe(x => this.canEdit = x[0] || x[1]);
    }

    addComment() {
        this._commentsService.add(this.newComment)
            .first()
            .subscribe(x => {
                this._toast.success('Comment added');
                this.tiny.editor.setContent('');
            });
    }

    removeComment(comment: Comment) {
        this._commentsService.remove(comment)
            .first()
            .subscribe(c => {
                this._toast.success('Comment removed');
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
