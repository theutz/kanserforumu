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

  add(discussion: Discussion): Observable<string> {
    const sub = new ReplaySubject<string>();
    this._db
      .list('/disussions')
      .push(null)
      .then(ref => { sub.next(ref.key); sub.complete(); });

    return sub.asObservable()
      .switchMap(discussionKey => {
        discussion.key = discussionKey;
        return this.set(discussion)
          .switchMap(() => this.addDiscussionToForum(discussion.forumKey, discussionKey))
          .switchMap(() => discussionKey);
      });
  }

  addDiscussionToForum(forumKey: string, discussionKey: string): Observable<void> {
    const promise = this._db
      .object(`/forums/${forumKey}/discussions/${discussionKey}`)
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

  makeDummyDiscussion(forumKey: string): Discussion {
    return {
      key: null,
      title: `Discussion #${Math.floor(Math.random() * 1000)}`,
      description: this._lorem.get(2),
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      forumKey: forumKey
    };
  }
}
