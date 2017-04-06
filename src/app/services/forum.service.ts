import { DiscussionsService } from './discussions.service';
import { Forum } from './forum';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ForumService {

  constructor(
    private _db: AngularFireDatabase,
    private _discussionsService: DiscussionsService
  ) { }

  getAll(): Observable<Forum[]> {
    return this._db
      .list('/forums');
  }

  get(forumKey: string): Observable<Forum> {
    return this._db
      .object(`/forums/${forumKey}`);
  }

  add(forum: Forum): Observable<string> {
    forum.key = this._db
      .list('/forums')
      .push(null).ref.key;

    return this.set(forum)
      .switchMap(() => forum.key);
  }

  set(forum: Forum): Observable<void> {
    const promise = this._db
      .object(`/forums/${forum.key}`)
      .set(forum);
    return Observable.fromPromise(<Promise<void>>promise);
  }

  update(forum: Forum): Observable<void> {
    const promise = this._db
      .object(`/forums/${forum.key}`)
      .update(forum)
    return Observable.fromPromise(<Promise<void>>promise);
  }

  remove(forumKey: string): Observable<void> {
    const promise = this._db
      .object(`/forums/${forumKey}`)
      .remove();

    const forumRemove$ = Observable
      .fromPromise(<Promise<void>>promise);

    const discussionsRemove$ = this._discussionsService
      .removeByForumKey(forumKey);

    return Observable
      .zip(forumRemove$, discussionsRemove$)
      .map(array => null);
  }
}
