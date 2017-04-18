import { Discussion } from '../services/discussion';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { NgxLoremIpsumService } from 'ngx-lorem-ipsum/lib';
import { Observable, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class DiscussionsService {

  constructor(
    private _db: AngularFireDatabase,
    private _lorem: NgxLoremIpsumService
  ) { }

  getAll(): Observable<Discussion[]> {
    return this._db
      .list('/discussions');
  }

  getByForumKey(forumKey: string): Observable<Discussion[]> {
    return this._db
      .list('/discussions', {
        query: {
          orderByChild: 'forumKey',
          equalTo: forumKey
        }
      });
  }

  get(discussionKey: string): Observable<Discussion> {
    return this._db
      .object(`/discussions/${discussionKey}`);
  }

  add(discussion: Discussion): Observable<Discussion> {
    return Observable.from(
      this._db.list(`/discussions`).push(null))
      .do((ref: firebase.database.ThenableReference) =>
        discussion.key = ref.key)
      .do(() => this.addDiscussionToForum(discussion.forumKey, discussion.key))
      .switchMap(f => this.set(discussion))
      .map(d => discussion);
  }

  addDiscussionToForum(forumKey: string, discussionKey: string): Observable<void> {
    const promise = this._db
      .object(`/forums/${forumKey}/discussionKeys/${discussionKey}`)
      .set(true);
    return Observable.fromPromise(<Promise<void>>promise);
  }

  set(discussion: Discussion): Observable<void> {
    const promise = this._db
      .object(`/discussions/${discussion.key}`)
      .set(discussion);
    return Observable.fromPromise(<Promise<void>>promise);
  }

  update(discussion: Discussion): Observable<void> {
    const promise = this._db
      .object(`/discussions/${discussion.key}`)
      .update(discussion);
    return Observable.fromPromise(<Promise<void>>promise);
  }

  remove(key: string): Observable<void> {
    const promise = this._db
      .object(`/discussions/${key}`)
      .remove();
    return Observable.fromPromise(<Promise<void>>promise);
  }

  removeByForumKey(forumKey: string): Observable<void> {
    return this.getByForumKey(forumKey)
      .map(discussions => {
        discussions.map(discussion => {
          this.remove(discussion.key);
        });
      });
  }
}
