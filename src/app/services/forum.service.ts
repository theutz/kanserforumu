import { Discussion } from './discussion';
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
    return this._db.list('/forums');
  }

  get(forumKey: string): Observable<Forum> {
    return this._db.object(`/forums/${forumKey}`);
  }

  add(forum: Forum): Observable<Forum> {
    return Observable.from(
      this._db.list(`/forums`).push(null))
      .do((ref: firebase.database.ThenableReference) =>
        forum.key = ref.key)
      .switchMap(f => this.set(forum))
      .map(f => forum);
  }

  set(forum: Forum): Observable<Forum> {
    return Observable
      .from(this._db.object(`/forums/${forum.key}`)
        .set(forum)
      ).map(() => forum);
  }

  update(forum: Forum): Observable<Forum> {
    forum.modifiedDate = new Date().toISOString();
    return Observable.from(this._db
      .object(`/forums/${forum.key}`)
      .update(forum)
    ).map(() => forum);
  }

  remove(forumKey: string): Observable<void> {
    const forumRm$ = Observable
      .defer(() =>
        this._db.object(`/forums/${forumKey}`)
          .remove()
      );

    const discussionsRm$ =
      this.removeDiscussionsForForum(forumKey);

    return Observable
      .forkJoin(forumRm$, discussionsRm$)
      .map(x => null)
      .first();
  }

  removeDiscussionsForForum(forumKey: string): Observable<void> {
    return this.getDiscussions(forumKey)
      .flatMap(discussions =>
        Observable.from(discussions)
          .flatMap(d =>
            Observable.defer(() =>
              this._db.object(`/discussions/${d.key}`)
                .remove()
            ))
      ).first();
  }

  getDiscussions(forumKey: string): Observable<Discussion[]> {
    return this._db.list(`/discussions`, {
      query: {
        orderByChild: 'forumKey',
        equalTo: forumKey
      }
    });
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
