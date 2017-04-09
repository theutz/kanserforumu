import { Forum } from './forum';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { Observable, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class ForumService {

  constructor(
    private _db: AngularFireDatabase,
  ) { }

  getAll(): Observable<Forum[]> {
    return this._db
      .list('/forums');
  }

  get(forumKey: string): Observable<Forum> {
    return this._db
      .object(`/forums/${forumKey}`);
  }

  add(forum?: Forum): Observable<Forum> {
    const forumWithKey$ = Observable
      .from(this._db.list('forums').push(null))
      .map(ref => ref.key)
      .map(key =>
        !!forum ? forum.key = key : this._blankForum(key));

    const forumSet$ = forumWithKey$
      .switchMap(f => this.set(f))
      .combineLatest(forumWithKey$);

    return Observable
      .combineLatest(forumSet$, forumWithKey$)
      .map(x => x[1]);
  }

  set(forum: Forum): Observable<void> {
    const promise = this._db
      .object(`/forums/${forum.key}`)
      .set(forum);
    return Observable.fromPromise(<Promise<void>>promise);
  }

  update(forum: Forum): Observable<void> {
    forum.modifiedDate = new Date().toISOString();
    const promise = this._db
      .object(`/forums/${forum.key}`)
      .update(forum);
    return Observable.fromPromise(<Promise<void>>promise);
  }

  remove(forumKey: string): Observable<void> {
    const promise = this._db
      .object(`/forums/${forumKey}`)
      .remove();

    const forumRemove$ = Observable
      .fromPromise(<Promise<void>>promise);

    // TODO: Merge with discussion removal
    // const discussionsRemove$ = this._discussionsService
    //   .removeByForumKey(forumKey);

    // return Observable
    //   .zip(forumRemove$, discussionsRemove$)
    //   .map(array => null);
    return forumRemove$;
  }

  private _blankForum(forumKey: string): Forum {
    return {
      key: forumKey,
      title: 'Forum',
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      description: '',
      discussionKeys: null
    };
  }
}
