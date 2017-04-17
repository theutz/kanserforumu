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
    return Observable.from(this._db.list(this._base).push(null))
      .map(ref => ref.key)
      .do(key => comment.key = key)
      .switchMap(key =>
        Observable.from(
          this._db.object(this._base + '/' + key).set(comment)
        ))
      .switchMap(() => this._db
        .object(`/discussions/${comment.discussionKey}/commentKeys/${comment.key}`)
        .set(true)
      )
      .switchMap(() => Observable.of(comment));
    // .map(ref => ref.key)
    // .do(console.log)
    // .do(key => comment.key = key)
    // .do(console.log)
    // .map(key => `${this._base}/${key}`)
    // .do(console.log)
    // .switchMap(url => Observable.from(this._db.object(url).update(comment)))
    // .do(console.log)
    // .switchMap(() => Observable.of(comment));
  }

}
