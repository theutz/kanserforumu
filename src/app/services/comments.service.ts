import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Comment } from './comment';

@Injectable()
export class CommentsService {
    private readonly _base = '/comments';

    constructor(
        private _db: AngularFireDatabase
    ) { }

    getAll(): Observable<Comment[]> {
        return this._db.list(this._base);
    }

    getAllByDiscussionKey(key: string): Observable<Comment[]> {
        return this._db.list(this._base, {
            query: {
                orderByChild: 'discussionKey',
                equalTo: key
            }
        });
    }

    add(comment: Comment): Observable<Comment> {
        return Observable.from(this._db.list(this._base).push(comment))
            .map(ref => ref.key)
            .do(key => comment.key = key)
            .switchMap(key => Observable.from(
                this._db.object(this._base + '/' + key).update(comment)))
            .switchMap(() => Observable.of(comment));
    }

    remove(comment: Comment): Observable<Comment> {
        return Observable.from(
            this._db.object(this._base + '/' + comment.key).remove())
            .switchMap(() => Observable.of(comment));
    }

}
