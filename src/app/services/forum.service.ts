import { DiscussionsService } from './discussions.service';
import { Forum } from './forum';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { Observable, ReplaySubject } from 'rxjs/Rx';

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

  add(forum?: Forum): Observable<string> {
    const subject = new ReplaySubject<string>();
    this._db
      .list('/forums')
      .push(null)
      .then(ref => {
        const key = ref.key;
        if (!!forum) {
          forum.key = key;
        } else { forum = this._blankForum(key); }
        subject.next(key);
        subject.complete();
      });
    const subject$ = subject.asObservable();

    return subject$.switchMap(() => {
      return this.set(forum)
        .map(() => forum.key);
    });
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

    const discussionsRemove$ = this._discussionsService
      .removeByForumKey(forumKey);

    return Observable
      .zip(forumRemove$, discussionsRemove$)
      .map(array => null);
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
